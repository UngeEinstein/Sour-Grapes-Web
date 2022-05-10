# project_3

# Kjøre prosjektet
**I my-app mappen skriv inn:**

`npm install`

**For å kjøre nettsiden:**

`cd ..`

`cd Backend/`

`node database.tsx`

Da kjører databasen.

**Åpne ny terminal**

`cd ..`

`cd my-app/`

`npm start`

**For å kjøre tester**

(Alle tre terminalene på kjøre samtidig)

**Åpne ny terminal**

I my-app mappen:

`npm test`

# Prosjekt oppsett
Vi startet med å lage create-react-app med typescript for å sette opp prosjektet. Deretter valgte vi datasettet vårt https://www.kaggle.com/zynicide/wine-reviews fordi vi syntes at det virket spennende og bra strukturert. Vi populerte den virtuelle maskinen med rett under 130 000 json elementer. Vi valget å bruke Typescript i backend, fordi vi anså det som enklere å forstå hverandres kode når det er definerte typer. 

# Tredjepartskomponenter
Alle tredjepartskompoenente vi har brukt er hentet fra https://material-ui.com/. Material-ui var veldig bra dokumentert og komponenetene hadde et helhetlig design samt veldig bra dokumentasjon.

# Backend API
## GraphQL vs REST
For å koble opp backend med frontend velger vi å benytte oss av GrahpQL. 
* Hovedgrunnen er fordi GraphQL løser REST sine problemer med under- og over fetching. 
* Da vi skal ta i bruk flere schemas er dette veldig nyttig fordi REST må gjøre ett HTTP kall per schema kan GraphQL gjøre ett kall for flere. 
* Et problem er at Graphql ikke har automatisk caching som er problematisk da datasettet vårt er på ca 130 000 json objekter, men dette kan vi løse på andre måter. 
* REST er også enklere å teste, men GraphQL har streng type deklarasjon som passer fint med tanke på at vi programmerer i typescript hvor det også er streng type deklarasjon. 

https://medium.com/@back4apps/graphql-vs-rest-62a3d6c2021d

## MongoDB & Mongoose
Vi kjører en MongoDB database på virtuell maskin og lagde en kobling mot databasen ved hjelp av Mongoose. Vi valgte å bruke .limit(50) kombinert med .skip() til å hente ut 50 elementer for en side. Vi valgte å gjøre det på denne måten, fordi vi ikke ønsket å ha for mange elementer lagret lokalt hos clienten. Vi lar også mongoose ta seg av sorteringen og filtreringen. Her brukte vi .find() og .sort(). Dette var den enkleste måten å forsikre oss om at elementene ble sortert blant alle dokumentene i databasen, ikke bare blant de 50 som haddde blitt sendt. Databasen lagrer ratinger som brukerene selv kan gi til hver vin.      

## Apollo & Express
For å sende dataen fra databasen til react bruker vi Apollo. Det gjør det letter å oppdatere brukergrensesnittet og behandle data forespørslene. Den har også et cache system. GraphQL serveren kjøres via Express å lytter på port 4000. Dette kobles sammen via Apollo med Client som kobler seg opp mot denne serveren.

# Testing
## End-2-End Testing
Vi brukte testrammeverket Cypress for å teste nettsiden vår end-2-end. Cypress gjør det enkelt å sette opp tester som finner elementer på nettsiden og interagerer med dem. I tillegg gir Cypress muligheten for en visuell representasjon for testene i nettleseren. Det funket veldig bra og gjorde feilhåndteringen mye enklere.

## Enhetstesting
For enhetstesting valgte vi også å bruke Cypress sin npm pakke *cypress-react-unit-test*. En av hovedgrunnene er fordi det er god practice å bruke samme rammeverk for testing. I tillegg kan enhetstestene som end-2-end testene visualiseres i nettleseren. Jest er raskere, men hvis man skriver gode, enkle tester med DRY prinsippet kjører de fortsatt raskt nok. Testene sjekker om komponentene mounter og de inneholder dataen som er forventet.

# State Management
## Redux
I dette prosjektet bruker vi Redux. I utgangspunktet er oppsettet for Mobx enklere for mindre prosjekter som dette, men ettersom vi hadde tidligere erfaring med Redux var dette det tryggeste valget.
I dette prosjektet er det flere komponenter som inneholder input-informasjon brukt til søk og filtrering.
Disse komponentene lagrer denne input-informasjonen i Redux. Denne informasjonen blir så hentet ut i" WineAccordion" komponenten som utfører queries og rendrer søkeresultatene. 
Vi valgte å bruke Redux til nettopp dette for å gjøre det enklere å dele opp i mindre komponenter uten å måtte tenke på hvordan vi skulle passe informasjon mellom komponentener som props. Dette
i tillegg til at det også fører til en enklere komponentstruktur.











