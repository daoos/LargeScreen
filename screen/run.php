<?php

require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/crawler.php';

use Screen\Crawler;

while (1) {
    $time = date('Y-m-d H:i:s');
    echo "info: $time Start...\n";
    $crawler = new Crawler();
    $crawler->crawl();
    unset($crawler);
    $time = date('Y-m-d H:i:s');
    echo "info: $time Finish.\n\n";
    sleep(3600);
}
