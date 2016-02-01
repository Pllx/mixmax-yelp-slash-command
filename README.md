# Yelp Slash Command for Mixmax

This is an open source Yelp Mixmax Slash Command. Use it to quickly find and add a link to a Yelp business in your email.

## Running locally

In order to use it, first open up the [Mixmax Dashboard](http://sdk.mixmax.com/docs/the-mixmax-dashboard), click Integrations, and click Add Slash Command. Fill in the form as suggested below:

![addSlashCommand](https://raw.github.com/pllx/mixmax-yelp-slash-command/master/assets/addSlashCommand.png)

Now, start the server by cloning this repo and running `npm install` and `npm start`. You can run the tests using `npm test`. Be sure to provide your Yelp API Keys in utils/key.js.

## Usage
Command: /yelp [search param] @ [location]

For example, to find 'Chicken rice' near 123 Example street, Los Angeles, simply type:

/yelp Chicken rice @ 123 Example street, Los Angeles

If you don't provide a search param, it will default to look for food. If you don't provide a location, it will default to look around San Francsico.


![typeahead](https://raw.github.com/pllx/mixmax-yelp-slash-command/master/assets/typeahead.png)


Once you've found the listing of your choice, select it by clicking or pressing 'Enter', and it will resolve to a link to Yelp:


![resolver](https://raw.github.com/pllx/mixmax-yelp-slash-command/master/assets/resolver.png)
