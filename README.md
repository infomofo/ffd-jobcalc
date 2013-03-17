FFD Job Calculator
==================
I wanted to learn [AngularJS](http://angularjs.org/) and also just got into Final Fantasy Dimensions
on Android, so I thought this would be a good opportunity.  I couldn't find any online Job
calculators, so I thought I'd give it a try.

I am using Bootstrap so I also plan to make the site responsive to mobile devices.

I am using Angular.JS and storing the build on the url, so the links can be copied and pasted to share.

The tool is hosted at [Github](http://infomofo.github.com/ffd-jobcalc/v1/index.html)

_Note: Most information is sourced from [GameFAQs](http://www.gamefaqs.com/iphone/672352-final-fantasy-dimensions/faqs)._

What is the Final Fantasy Dimensions Job System?
------------------------------------------------
Final Fantasy Dimensions is a Role Playing Game published by Square Enix for various mobile platforms.  Much like its predecesors, it features a complex and flexible Job system.  Depending on the stage of the game, you have a limited amount of Job Points (JP) to spend in one of 10 jobs available to each character.  Job points spent can unlock abilities that can be used, even while you're equipping other jobs.  Additionally, certain combinations of allocated job points will enable your character to unlock powerful fusion abilities that can't be acquired any other way, and are some of the most powerful abilities in the game.

How to use FFD Job Calculator
-----------------------------
1. Select a character to get the list of eligible jobs and base abilities
2. Click on cells in the table to allocate job points for a given job row
3. All eligible abilities for the selected build will appear under "Abilities"
4. All unlocked fusions associated with those abilities will appear under "Unlocked Fusions"
5. A running counter of the required JP and AP to reach that build will display

Features
========
* Selecting a character should update the url so that you can copy and paste and retrieve that character again.  Build to be added soon- i.e. /ffd-jobcalc/v1/index.html?character=2
* Mobile responsive template for use on smaller screens

Future use cases
================
* Show what events in the game needed to reach required JP level
* Enable tooltips for spell descriptions and other features
* Plan a complete equip build for different base classes
* Teach you how to acquire different fusions
* Limit JP selection according to what is possible in game in different stages
* Dedupe different levels of the same magic skill (i.e. White Magic Lv. 1 and 2)
* Show contribution of character selection and attributes to possible stats at different levels

Known issues
============
* URL parameters are not strictly validated.  You could enter additional classes or job points in an existing class beyond 20 that would absorb JP in the calculator without doing anything, or negative jp in the json in the url to get more points.
* It is possible to unlock some fusions with spells that are accessible without actually spending any ap in a job.  For example, "Thunder Slash" is accessible for any character with EITHER Black Mage Lv 1 or Warrior Lv. 1, as you can level one job to get the equippable ability, and then just equip that on the level 0 job to unlock the F-Ability.  I haven't yet modeled for that.

APIs
---------
If there are any breaking changes to the data model or the api, I will retain old versions to maintain working links, and create new api endpoints.

* api v1: [/v1]((./v1)) - Initial character builder

Sources
-------
* [Final Fantasy Dimensions on Google Play](https://play.google.com/store/apps/details?id=com.square_enix.android_googleplay.ffl_gp)
* [FFD FAQ/Walkthrough Version 1.30 by holyknight](http://www.gamefaqs.com/iphone/672352-final-fantasy-dimensions/faqs/65107) - Source of the character level attributes
* [Ability Acquisition FAQ 1.1 by Sir Phoenix](http://www.gamefaqs.com/iphone/672352-final-fantasy-dimensions/faqs/66204#section30) - Source of the job level and fusion data
* [Delta Attack Final Fantasy Dimensions Job Skills Guide](http://www.deltaattack.com/2013/01/16/final-fantasy-dimensions-job-abilities-faq-help/)
* [Final Fantasy Wikia: Final Fantasy Dimensions](http://finalfantasy.wikia.com/wiki/Final_Fantasy_Dimensions)