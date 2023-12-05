// Traduction TypeScript d'une solution PHP fournie, avec ajout de commentaire pour la compréhension de la logique

import * as fs from 'fs'
import path from 'path'

const filePath = path.join(__dirname, '../rawPuzzle.txt')

const dayFourArray: string = fs.readFileSync(filePath, 'utf-8')

const processScratchcards: (cards: string) => number = cards => {
  // Initialiser le total de carte que l'on aura à la fin
  // Total est initialisé à 1 parce que la première carte lu est card 1, enregistrée sous 'Card Number: 1'
  let card: number = 0
  const extraCards: Record<number, number> = {}

  // Lire le fichier fourni en paramètre ligne par ligne en supprimant les espaces au début et à la fin
  const lines = cards.split('\n').map(line => line.trim())

  // Boucle for pour parcourir les lignes pour récupérer les données de cards et les séparer en fonction de mes besoins.
  for (const currentLine of lines) {
    const regexToSplitLines = currentLine.match(
      /^Card +(?<numeroCard>[0-9]+):(?<winningNumbers>( +[0-9]+)+) \|(?<numbersWeGot>( +[0-9]+)+) *$/
    )

    // Utilisation d'une regex pour récupérer les variables
    // Ici pour la ligne construite  Card X: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
    // J'ai besoin de stocker ${numeroCard} => '1'
    // ${winningNumbers} => '41 48 83 86 17'
    // ${numbersWeGot} => '83 86  6 31 17  9 48 53'
    if (regexToSplitLines) {
      // numeroCard est passée en parseInt puisqu'on aura besoin que sa valeur soit en int plus bas, car un index de
      // tableau ne peux pas être en string.
      const numeroCard =
        parseInt(regexToSplitLines.groups?.numeroCard ?? '0', 10) ?? 'N/A'
      const winningNumbers = regexToSplitLines.groups?.winningNumbers ?? 'N/A'
      const numbersWeGot = regexToSplitLines.groups?.numbersWeGot ?? 'N/A'

      console.log(`Card Number: ${numeroCard}`)
      console.log(`Winning Numbers: ${winningNumbers}`)
      console.log(`Numbers We Got: ${numbersWeGot}`)

      // Ici on va chercher s'il y a des points commun entre ${winningNumbers} et ${numbersWeGot} pour savoir
      // combien de chiffre gagnant on a. On va en avoir besoin plus bas pour savoir combien de carte bonus sont gagnées
      // par carte (=> "vous gagnez des copies des cartes à gratter en dessous de la carte gagnante,
      // égales au nombre de correspondances")
      // Pour ce faire on va stocker les données dans des tableaux grâce à notre fonction getAllNumbers()
      const winningNumbersArray: number[] = getAllNumbers(winningNumbers)
      const numbersWeGotArray: number[] = getAllNumbers(numbersWeGot)

      const winningNumbersWeGot: number[] = winningNumbersArray.filter(number =>
        numbersWeGotArray.includes(number)
      )
      console.log(`Wining Numbers We Got : ${winningNumbersWeGot}`)

      // Ensuite on va calculer combien de nombre gagnant on a.
      // Par exemple Card X: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
      // Cette carte à les numéros gagnants : 48, 83, 86 et 17
      // On veux donc retenir qu'elle en a 4
      const howManyWinningNumbers = winningNumbersWeGot.length
      console.log(`How Many Winning Numbers : ${howManyWinningNumbers}`)

      // Initialisation du total, en commençant par 1 car la première carte lue est la 'card 1'
      let total: number = 1

      // Regarde la carte lue est déjà dans le tableau extraCards[].
      // Si elle l'est, on ajoute sa valeur actuelle (stockée dans extraCards[numeroCard])
      // au total, puis on supprime son entrée dans le tableau.
      // Cela permet de ne pas boucler plusieurs fois sur la même carte.
      // On ne rentre qu'une seule fois dans la boucle par itération, mais elle permet d'ajouter au
      // total le nombre d'instance du doublon de la carte sur laquelle on est en train d'itérer
      if (extraCards[numeroCard] !== undefined) {
        total += extraCards[numeroCard]
        console.log(
          `nombre d'instance supplémentaire de ${numeroCard} : ${extraCards[numeroCard]}`
        )
        delete extraCards[numeroCard]
      }

      // Ensuite, on parcourt une boucle pour ajouter le nombre de cartes associées au
      // nombre de numéros gagnants. Si howManyWinningNumbers = 4, la boucle se fera 4 fois et
      // extraCards[extraCardIndex] sera mis à jour en conséquence. Par exemple pour la première ligne du tableau de test
      // Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53 on a numeroCard = 1 ,
      // howManyWinningNumbers = 4, et donc les cartes  2, 3, 4 et 5 sont stockées dans 4 extraCardIndex supplémentaire.
      // En gros comme demandé dans la consigne, ça crée un exemplaire supplémentaire de la carte 2, 3, 4 et 5.
      // C'est ces ajouts de cartes qui seront ajouté dans la boucle juste au dessus
      for (let index: number = 0; index < howManyWinningNumbers; ++index) {
        const extraCardIndex: number = numeroCard + index + 1
        console.log(`extraCardIndex : ${extraCardIndex}`)

        // Calcul du total actuel de la boucle en comptant les cartes de bases + leurs extras
        extraCards[extraCardIndex] = total + (extraCards[extraCardIndex] ?? 0)
      }

      card += total
    }
  }

  return card
}

// Fonction qui récupère la string fournies, sépare chaque entrée entre ' ' (par exemple '41 48' deviens deux entrée distincte '41' et '48')
// Et si la valeur trouvé est plus longue que 0 (soit, existe) et est un nombre, le nombre string est transformé en nombre int
const getAllNumbers: (text: string) => number[] = text => {
  const numbers: number[] = []
  text.split(' ').forEach(item => {
    const trimmed = item.trim()
    if (trimmed.length > 0 && !isNaN(Number(trimmed))) {
      numbers.push(parseInt(trimmed, 10))
    }
  })

  return numbers
}

const cardTest = `
  Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
  Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
  Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
  Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
  Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
  Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11
  `

// // Functionnal test of the function calculatePoints (expected answer => 30)
// const totalScratchcards: number = processScratchcards(cardTest)

const totalScratchcards = processScratchcards(dayFourArray)

console.log(`Total: ${totalScratchcards}`)
