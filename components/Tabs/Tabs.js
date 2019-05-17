NodeList.prototype.filter = Array.prototype.filter
NodeList.prototype.map = Array.prototype.map

class TabLink {
    constructor($tabElement, $tabs) {
        // assign this.$tabElement to the $tabElement DOM reference
        this.$tabElement = $tabElement
        this.$tabs = $tabs
        // Get the `data-tab` value from this.$tabElement and store it here
        this.tabData = this.$tabElement.dataset.tab

        // We need to find out if a user clicked 'all' cards or a specific category.  Follow the instructions below to accomplish this task:
        this.$cards = document.querySelectorAll(".card")

        // Check to see if this.tabData is equal to 'all'
        if (this.tabData !== "all") {
            this.$cards = this.$cards.filter(
                $card => $card.dataset.tab === this.tabData
            )
        }

        // Map over the newly converted NodeList we just created in our if statement above. Convert each this.cards element into a new instance of the TabCard class. Pass in a card object to the TabCard class.
        this.cards = this.$cards.map($card => new TabCard($card))

        // Add a click event that invokes this.selectTab
        this.$tabElement.addEventListener("click", this.selectTab.bind(this))
    }

    selectTab({ target }) {
        // Iterate through the NodeList removing the .active-tab class from each element
        this.$tabs.forEach($tab => $tab.classList.remove("active-tab"))

        // Select all of the elements with the .card class on them
        // Iterate through the NodeList setting the display style each one to 'none'
        document
            .querySelectorAll(".card")
            .forEach($card => ($card.style.display = "none"))

        // Add a class of ".active-tab" to this.$tabElement
        this.$tabElement.classList.add("active-tab")

        // Notice we are looping through the this.cards array and invoking selectCard() from the TabCard class. Just un-comment the code and study what is happening here.
        this.cards.forEach(card => card.selectCard())
    }
}

class TabCard {
    constructor($cardElement) {
        // Assign this.$cardElement to the $cardElement DOM reference
        this.$cardElement = $cardElement
    }
    selectCard() {
        // Update the style of this.$cardElement to display = "flex"
        this.$cardElement.style.display = "flex"
    }
}

/* START HERE: 

- Select all classes named ".tab" and assign that value to the tabs variable

- With your selection in place, now chain a .forEach() method onto the tabs variable to iterate over the DOM NodeList

- In your .forEach() method's callback function, return a new instance of TabLink and pass in each tab as a parameter

*/
const createArticle = (
    headline,
    author,
    topic,
    avatar = "./assets/bones.jpg"
) => {
    const $card = document.createElement("card")
    $card.dataset.tab = topic
    $card.classList.add("card")

    const $headline = document.createElement("div")
    $headline.classList.add("headline")
    $headline.textContent = headline

    const $author = document.createElement("div")
    $author.classList.add("author")

    const $imgContainer = document.createElement("div")
    $imgContainer.classList.add("img-container")

    const $img = document.createElement("img")
    $img.setAttribute("src", avatar)

    const $byline = document.createElement("span")
    $byline.textContent = `By ${author}`

    const $cardsContainer = document.querySelector(".cards-container")

    $imgContainer.appendChild($img)

    $author.appendChild($imgContainer)
    $author.appendChild($byline)

    $card.appendChild($headline)
    $card.appendChild($author)

    $cardsContainer.appendChild($card)

    return $card
}

Array(18)
    .fill("")
    .map((spot, index) =>
        createArticle(
            `New Headline ${index + 1}`,
            `New Author ${index + 1}`,
            "node"
        )
    )
    .map($article => new TabCard($article))

const $tabs = document.querySelectorAll(".tab")
$tabs.forEach($tab => new TabLink($tab, $tabs))
