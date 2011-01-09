<?php

require_once('constant.php');
require_once('config.php');

class mini_plurk_api {
    /**
     * User name
     * @var string $username
     */
    protected $username;

    /**
     * Password
     * @var string $password
     */
    protected $password;

    /**
     * API KEY
     * @var $api_key
     */
    protected $api_key;

    /**
     * Login status
     * @var bool $is_login
     */
    protected $is_login = FALSE;

    /**
     * Current HTTP Status Code
     * @var int $http_status
     */
    protected $http_status;

    /**
     * Current HTTP Server Response
     * @var JSON object $http_response
     */
    protected $http_response;

    /**
     * User infomation
     * @var JSON object $user_info
     */
    protected $user_info;

    /**
     * The unique user id.
     * @var int $uid
     */
    protected $uid;

    /**
     * The unique nick_name of the user, for example amix.
     * @var string $nick_name
     */
    protected $nick_name;

    /**
     * The non-unique display name of the user, for example Amir S. Only set if it's non empty.
     * @var string $display_name
     */
    protected $display_name;
    /**
     * If 1 then the user has a profile picture, otherwise the user should use the default.
     * @var int $has_profile_image
     */
    protected $has_profile_image;

    /**
     * Specifies what the latest avatar (profile picture) version is.
     * @var string $avatar
     */
    protected $avatar;

    /**
     * The user's location, a text string, for example Aarhus Denmark.
     * @var string $location
     */
    protected $location;

    /**
     * date_of_birth: The user's birthday.
     * @var string $date_of_birth
     */
    protected $date_of_birth;

    /**
     * The user's full name, like Amir Salihefendic.
     * @var string $full_name
     */
    protected $full_name;

    /**
     * 1 is male, 0 is female.
     * @var int $gender;
     */
    protected $gender;

    /**
     * The profile title of the user.
     * @var string $page_title
     */
    protected $page_title;

    /**
     * User's karma value.
     * @var int $karma
     */
    protected $karma;

    /**
     * How many friends has the user recruited.
     * @var int $recruited;
     */
    protected $recruited;

    /**
     * Can be not_saying, single, married, divorced, engaged, in_relationship, complicated, widowed, open_relationship
     * @var string $relationship
     */
    protected $relationship;

    /**
     * fans count
     * @var int $fans_count
     */
    protected $fans_count;

    /**
     * alert count
     * @var int $alerts_count
     */
    protected $alerts_count;

    /**
     * friends count
     * @var int $friends_count
     */
    protected $friends_count;

    /**
     * Plurk Privacy
     * @var boolean $privacy
     */
    protected $privacy;

    function __construct() {}

    function create_curl($url, $array) {
        $ch = curl_init();

        // the presence of Expect header generates upload error on tuxfamily.org
        curl_setopt($ch, CURLOPT_HTTPHEADER, array( 'Expect:' ));

        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, TRUE);
        curl_setopt($ch, CURLOPT_POSTFIELDS , $array);

        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        //curl_setopt($ch, CURLOPT_FOLLOWLOCATION, TRUE);
        curl_setopt($ch, CURLOPT_MAXREDIRS, 1);

        curl_setopt($ch, CURLOPT_USERAGENT, PLURK_AGENT);

        curl_setopt($ch, CURLOPT_COOKIEFILE, PLURK_COOKIE_FILE_PATH);
        curl_setopt($ch, CURLOPT_COOKIEJAR, PLURK_COOKIE_FILE_PATH);

        return $ch;
    }

    function login($api_key = '', $username = '', $password = '') {
        $array = array(
                'api_key'  => $api_key,
                'username' => $username,
                'password' => $password,
        );
        $ch = $this->create_curl(PLURK_LOGIN, http_build_query($array));
        $response = curl_exec($ch);

        $this->http_response = $response;
        $this->http_status = curl_getinfo($ch, CURLINFO_HTTP_CODE);

        curl_close($ch);

        $result = json_decode($response);

        ($this->http_status == '200') ? $this->is_login = TRUE : $this->is_login = FALSE;

        if ($this->is_login) {
            $this->username = $username;
            $this->password = $password;
            $this->api_key = $api_key;
            $this->user_info = $result;
            $this->fans_count = $result->fans_count;
            $this->alerts_count = $result->alerts_count;
            $this->friends_count = $result->friends_count;
            $this->privacy = $result->privacy;
        } else {
            exit('Something goes wrong, please try again and again and again...');
        }

        return $this->is_login;
    }

    /**
     * function get_login_status
     * Get login status
     *
     * @return boolean
     */
    function get_login_status() {
        return ($this->is_login) ? TRUE : FALSE;
    }

    function upload_picture($upload_image = '') {
        $array = array(
            'api_key' => $this->api_key,
            'image' => "@" . $upload_image
            );

        $ch = $this->create_curl(PLURK_TIMELINE_UPLOAD_PICTURE, $array);
        $response = curl_exec($ch);
        curl_close($ch);

echo "---------- " . $response;

        $response = json_decode($response);

        return $response;
    }
}
?>