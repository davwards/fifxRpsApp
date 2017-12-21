const React = require("react")
const ReactDOM = require("react-dom")
const PlayForm = require("../src/components/PlayForm")

var domFixture

function setupDom() {
    domFixture = document.createElement("div")
    document.body.appendChild(domFixture)
}

beforeEach(function () {
    setupDom()
})

function page() {
    return domFixture.innerText
}

afterEach(function () {
    domFixture.remove()
})

function renderComponent(component){
    ReactDOM.render(
        component,
        domFixture
    )
}

window.page = page
window.renderComponent = renderComponent
window.domFixture = domFixture
