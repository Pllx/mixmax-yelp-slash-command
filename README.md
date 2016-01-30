# Yelp Slash Command for Mixmax

This is an open source Yelp Mixmax Slash Command. Use it to quickly find and add a link to a Yelp business in your email.

## Usage

Command: /yelp [search param] @ [location]

For example, to find 'Chicken rice' near 123 Example street, Los Angeles, simply type:

/yelp Chicken rice @ 123 Example street, Los Angeles

If you don't provide a search param, it will default to look for food. If you don't provide a location, it will default to look around San Francsico.


![typeahead](https://raw.github.com/pllx/mixmax-yelp-slash-command/master/assets/typeahead.png)


Once you've found the listing of your choice, select it by clicking or pressing 'Enter', and it will resolve to a link to Yelp:


![resolver](https://raw.github.com/pllx/mixmax-yelp-slash-command/master/assets/resolver.png)


## Running locally

1. Install using `npm install`
2. Run using `npm start`
3. Test using `npm test`
