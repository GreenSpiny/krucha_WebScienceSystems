<?php
require_once('TwitterAPIExchange.php');

$settings = array(
    'oauth_access_token' => '704026379814367232-VkffkJ9ceQnQHiJyDIfdoR3YtKrlWx7',
    'oauth_access_token_secret' => 'QuNDvPJG5dpeQXguj9SdLY1Q7PP8lUGmqegfnkVnK4h3X',
    'consumer_key' => 'ju6TYt0prSTwf2RnZ3dBT7cX4',
    'consumer_secret' => 'VkpFQ8Jd0NRrbF5iDp63pcfCB5YMg40SYDej8zXjFVSh5Cmr3o'
);

$url = "https://api.twitter.com/1.1/search/tweets.json";
$requestMethod = "GET";

$query = '?q=';
if(isset($_GET['q']) && $_GET['q']!='' ) {

    $query .= $_GET['q'];

} else {
    $query .= 'something';
}

//echo $query;
$twitter = new TwitterAPIExchange($settings);
$results = $twitter->setGetfield($query)->buildOauth($url, $requestMethod)->performRequest();
echo $results;
?>
