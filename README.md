# webext-firstpartyisolation

This add-on enables First Party isolation. Clicking the Fishbowl icon
or removing the add-on disables it again.

## What is First Party Isolation ##
First Party Isolation, also known as
[Cross-Origin Identifier Unlinkability](https://www.torproject.org/projects/torbrowser/design/#identifier-linkability)
is a concept from the Tor Browser.
The idea is to key every source of browser identification with the domain
in the URL bar (the first party). This makes all access to identifiers
distinct between usage in the website itself and through third-party. *Think
of it as blocking Third-party cookies, but more exhaustively.*
Here are [Firefox's implementation details about First Party Isolation](https://wiki.mozilla.org/Security/FirstPartyIsolation)

## Installation
[Install on addons.mozilla.org](https://addons.mozilla.org/en-US/firefox/addon/first-party-isolation/)

#### What's up with the fishbowl icon?
It's hard to come up with an icon that explains First Party Isolation and
I liked the fishbowl. 
