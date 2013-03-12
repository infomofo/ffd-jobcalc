FFD Character Planner
=====================

I wanted to learn [AngularJS](http://angularjs.org/) and also just got into Final Fantasy Dimensions
on Android, so I thought this would be a good opportunity.  I couldn't find any online Job
calculators, so I thought I'd give it a try.

I am using Bootstrap so I also plan to make the site responsive to mobile devices.

This should be a purely client-side implementation of a job calculator for Final Fantasy Dimensions.

The tool is hosted at [Github](http://infomofo.github.com/ffd-jobcalc/v1/index.html)

_Note: Most information is sourced from [GameFAQs](http://www.gamefaqs.com/iphone/672352-final-fantasy-dimensions/faqs)._


How to use FFD Character Planner
--------------------------------

1. Select a character to get the list of eligible jobs
2. Add points to the rows representing different jobs by clicking on the plus sign, or remove already spent levels by clicking on the minus sign.

Features
========

* Selecting a character should update the url so that you can copy and paste and retrieve that character again.  Build to be added soon- i.e. /ffd-jobcalc/v1/index.html?character=2
* Mobile responsive template for use on smaller screens

Future use cases
----------------

* Support bookmarking builds
* Support linking to builds

APIs
---------

* api v1: /v1 - Initial character builder

Sources
-------

* [FFD FAQ/Walkthrough Version 1.30 by holyknight](http://www.gamefaqs.com/iphone/672352-final-fantasy-dimensions/faqs/65107)
* [Ability Acquisition FAQ 1.1 by Sir Phoenix](http://www.gamefaqs.com/iphone/672352-final-fantasy-dimensions/faqs/66204#section30)