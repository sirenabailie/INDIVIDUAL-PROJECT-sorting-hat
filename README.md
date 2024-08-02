# Sorting Hat [![Netlify Status](https://api.netlify.com/api/v1/badges/21458535-884f-473c-b69e-8e641c0474ec/deploy-status)](https://app.netlify.com/sites/sirenas-sorting-hat/deploys)

## OVERVIEW: 
The purpose of this app is to sort the user into one of four Hogwarts houses randomly, and generate a card based on name input. The cards can then be 'ex=spelled' to voldemort's army as death eaters.

## DESCRIPTION OF USER: 
- The ideal user for this project is a user familiar with Harry Potter. 

## FEATURES: 
- The user is welcomed by the sorting hat using a bootstrap card
- A form for name input appears when user clicks "Put on the Sorting Hat" button at bottom of welcome card
- Once the user enters a name and clicks "Sort!", the form is cleared and hidden once again.
- After clicking "Sort!", a card is generated in a div labelled "First Years". The card contains the randomly assigned house image users' name, house name assigned, and description of random house assigned. There is also an "ex-spell" button at the bottom of each "First Year" card.
- Additionally, after clicking "Sort!", a "Clear All" button appears at the bottom of the screen. This allows the user to clear all cards from the DOM and begin fresh without resetting the DOM. The "Clear All" button disappears once it has been clicked.
- There are five filter buttons above the cards which allow the user to sort the cards by house. There is also a show all button.
- When the "Ex-Spell" button is clicked, the card is moved from the "app-content" div to the 'ex-spelled-content" div. The card also changes image, background color, house type, and house description. 

## HELPUL LINKS:
- Netlify link:  https://sirenas-sorting-hat.netlify.app/

## CONTRIBUTORS: 
Sirena Foster https://github.com/sirenabailie

SCREENSHOTS: 
![Screenshot](/Screenshots/sortinghat.png)
![Screenshot](/Screenshots/sortinghat2.png)
