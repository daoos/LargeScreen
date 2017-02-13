<?php

require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/crawler.php';

use Screen\Crawler;

$crawler = new Crawler();
$crawler->crawl();
