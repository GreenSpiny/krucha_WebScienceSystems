TWEET READER
------------

Periodically reads tweets from a JSON file and displays them on the screen.

FUNCTIONALITY:
- Hover over a tweer to see its hashtags, if any.
- Click on a tweet to visit the original post on Twitter.
- The first tweet in the queue is larger, and is accompanied by the poster's user name and profile picture.  
  If the link to the profile picture no longer exists, a default profile picture is used instead.

BOOTSTRAP:
- Bootstrap is used for the buttons and the tooltips.

CODING NOTES:
- The 'onerror' attribute is used when an image fails to load (because the JSON file has outdated links).  This is 
  intended, so GET errors will appear in the console with no harm done.
- Since the positioning of the elements isn't uniform (i.e. in a straight line), they are placed using CSS rather
  than in javascript code (they could be, but no more effectively).
- The hashtags are shown as tooltips rather than as a list.