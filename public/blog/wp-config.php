<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'uptaapc_blog' );

/** MySQL database username */
define( 'DB_USER', 'root' );

/** MySQL database password */
define( 'DB_PASSWORD', '' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'o h*b#,O,p/,-aq){q_.LLp+|$ 8qh#qja_XbK|vZA4f/vKw2_HqD:^y99UL9/ q' );
define( 'SECURE_AUTH_KEY',  'eFD ]+vHKt4[Ae%YAyuK&s`D*r|Q==bpd,{;y#M;%-I `D6Nswo.B79u`ov(^}XH' );
define( 'LOGGED_IN_KEY',    '.jh/2g89Sf @^f~&.,2(cgdXK l%:i@bb%&Yay./s,mkI_G$,Q`on=TtFe{7P2{%' );
define( 'NONCE_KEY',        '{%Yx`U>@GY8yOX&()U`RMt9rMd-CJ.6zx5anII&|@#;9k.~vE>5&%5,M}M^iL]69' );
define( 'AUTH_SALT',        'K4M,x^88|.Vp>-B9N?]ijUj_!@_G]KzzxICtsG-ymL,9qU}Am_Z J_T*DG.2.a`=' );
define( 'SECURE_AUTH_SALT', 'th]7qLmLv8kI|35nEPI$_&,lr|s[YU+@|9m$: A@ld&S<=D?@ZMnEV040bE`%F.=' );
define( 'LOGGED_IN_SALT',   'NYQt*#q{s}V%&Ki]-cn1NPu<-j6ZJKUMSME;JoyOm pS%}kvZlYzZlHxQ=le3zvk' );
define( 'NONCE_SALT',       'e&#$vR/4IU,5xm_6Y8@Qf=.xn`TcWi#uV/2(^?*]r_8agl]U/:bGlgyXLLdnbDg.' );

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
