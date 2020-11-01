import VoiceWidget from "./voice-widget/voice-widget.js";
require('stream');
var socket = io.connect("https://voice-search-demo.herokuapp.com/");

socket.on("connect", function() {});

const search = instantsearch({
  indexName: "voice_search_demo",
  searchClient: algoliasearch("XC1DYSAPBX", "3720c40761477e74cb938856acebfa31"),
  routing: true
});

search.addWidget(
  instantsearch.widgets.configure({
    hitsPerPage: 12
  })
);

search.addWidget(
  instantsearch.widgets.hits({
    container: "#hits",
    templates: {
      empty: "No results",
      item: `
            <div class="item">
                <div class="centered"><img src="{{image}}" alt=""></div>
                <div class="centered"><div class="add-to-cart"><i class="fas fa-cart-plus"></i> Add <span class="hide-mobile hide-tablet">to Cart</span></div></div>
                <div class="item-content">
                    <p class="category">{{{_highlightResult.category.value}}}</p>
                    <p class="name">{{{_highlightResult.name.value}}}</p>
                </div>
            </div>
            <p class="price">Price: {{{price}}}€</p>
            <br>`
    }
  })
);

search.addWidget(
  new VoiceWidget({
    container: "#voice-search",
    placeholder: "Search for dogs and breeds",
    socket: socket,
    processor: "gcp"
  })
);

search.addWidget(
  instantsearch.widgets.pagination({
    container: "#pagination"
  })
);

search.addWidget(
  instantsearch.widgets.stats({
    container: "#stats-container"
  })
);

search.addWidget(
  instantsearch.widgets.refinementList({
    container: "#category",
    attribute: "category",
    limit: 5,
    showMore: true,
    searchable: true,
    searchablePlaceholder: "Search our categories"
  })
);

search.addWidget(
  instantsearch.widgets.refinementList({
    container: "#categories",
    attribute: "categories"
  })
);

search.addWidget(
  instantsearch.widgets.rangeSlider({
    container: "#price",
    attribute: "price"
  })
);

search.start();
