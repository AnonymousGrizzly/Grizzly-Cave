<?php
	header( "Access-Control-Allow-Origin: *" );
	header( "Access-Control-Allow-Headers: *" );
	header( "Access-Control-Allow-Methods: POST, PUT, GET, OPTIONS");
	header( 'Content-Type: application/json; charset=UTF-8' );
	
	error_reporting( E_ALL );
	ini_set( 'display_errors', false );
	ini_set( 'log_errors', true );
	ini_set( 'error_log', 'php-errors.log' );
	
	require_once( "./database/Database.php" );
	
	$requestParts = explode( '/', $_GET['request'] );
	
	switch ( $requestParts[0] ) {

		/* Main endpoints */
		
		case "login":
			require_once( "./endpoints/login.php" );
			break;
		case "register":
			require_once( "./endpoints/register.php" );
			break;
		

            //not yet needed

		case "file-upload":
			require_once( "./endpoints/file_upload.php" );
			break;
		case "file-download":
			require_once( "./endpoints/file_download.php");
			break;
		
		case "forgot-password":
			require_once( "./endpoints/forgot_password.php");
			break;
		case "change-password":
			require_once( "./endpoints/change_password.php");
			break;
		case "user":
			require_once( "./endpoints/user.php" );
			break;
		case "settings":
			require_once( "./endpoints/settings.php" );
			break;
	
		case "file":
			require_once( "./endpoints/file.php");
			break;
		case "change-email":
			require_once("./endpoints/change_email.php" );
			break;
		
		
		default:
			$response = response( [
				'status'  => "failed",
				"code"    => 404,
				"message" => "Invalid endpoint",
			] );
			die( json_encode( $response ) );
			
			break;
	}

?>
