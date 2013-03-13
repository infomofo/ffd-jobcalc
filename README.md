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
* Show eligible abilities and fusions
* Show what events in the game needed to reach required JP level
* Enable tooltips for spell descriptions and other features

Known issues
------------
* URL parameters are not strictly validated.  You could enter additional classes or job points in an existing class beyond 20 that would absorb JP in the calculator without doing anything, or negative jp in the json in the url to get more points.

APIs
---------

* api v1: /v1 - Initial character builder

Sources
-------

* [FFD FAQ/Walkthrough Version 1.30 by holyknight](http://www.gamefaqs.com/iphone/672352-final-fantasy-dimensions/faqs/65107) - Source of the character level attributes
* [Ability Acquisition FAQ 1.1 by Sir Phoenix](http://www.gamefaqs.com/iphone/672352-final-fantasy-dimensions/faqs/66204#section30) - Source of the job level and fusion data
* [Final Fantasy Wikia: Final Fantasy Dimensions](http://finalfantasy.wikia.com/wiki/Final_Fantasy_Dimensions)