<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit9f6c237d9691cc7b6842873b8e457e9e
{
    public static $files = array (
        'e9b046393eb3376a21bcc1a30bd2fe64' => __DIR__ . '/..' . '/querypath/querypath/src/qp_functions.php',
    );

    public static $prefixLengthsPsr4 = array (
        'M' => 
        array (
            'Masterminds\\' => 12,
        ),
        'C' => 
        array (
            'Curl\\' => 5,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Masterminds\\' => 
        array (
            0 => __DIR__ . '/..' . '/masterminds/html5/src',
        ),
        'Curl\\' => 
        array (
            0 => __DIR__ . '/..' . '/php-curl-class/php-curl-class/src/Curl',
        ),
    );

    public static $prefixesPsr0 = array (
        'Q' => 
        array (
            'QueryPath' => 
            array (
                0 => __DIR__ . '/..' . '/querypath/querypath/src',
            ),
        ),
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit9f6c237d9691cc7b6842873b8e457e9e::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit9f6c237d9691cc7b6842873b8e457e9e::$prefixDirsPsr4;
            $loader->prefixesPsr0 = ComposerStaticInit9f6c237d9691cc7b6842873b8e457e9e::$prefixesPsr0;

        }, null, ClassLoader::class);
    }
}
