<?php
/**
 * crawler.php
 *
 * @author  Huangxiangchao
 * @version 1.0
 */
namespace Screen;

use Curl\Curl;
use Masterminds\HTML5;
use QueryPath\DOMQuery;

/**
 * Class Crawler
 *
 * @package Screen
 */
class Crawler
{
    private $config;
    private $domConfig;
    private $curl;
    public $content = [];

    /**
     * Crawler constructor.
     */
    public function __construct()
    {
        $this->domConfig = require __DIR__ . '/domConfig.php';
        $this->config = require __DIR__ . '/config.php';
        $this->curl = new Curl();
    }

    /**
     * 抓取执行
     */
    public function crawl()
    {
        foreach ($this->domConfig as $k => $eachConfig) {
            $this->content = [];
            $baseUrl = isset($eachConfig['baseUrl']) ? $eachConfig['baseUrl'] : '';
            $titleParse = isset($eachConfig['titleParse']) ? $eachConfig['titleParse'] : '';
            $dateParse = isset($eachConfig['dateParse']) ? $eachConfig['dateParse'] : '';

            if (!$baseUrl) {
                echo "Notice: empty base usr, program will continue. \n";
                continue;
            }

            $html = $this->catchUrl($baseUrl);
            if (!$html) {
                echo "Error: No html data return. crawl url is $baseUrl\n";
                continue;
            }
            $content = $this->parseHtml($html, $titleParse, $dateParse);
            $content = ['news' => $content, 'time' => date('Y-m-d H:i:s')];
            $log = json_encode($content);
            // 写文件
            $this->writeLog($log);
        }
    }

    /**
     * 发起 curl
     *
     * @param string $url
     *
     * @return bool|null
     */
    public function catchUrl($url)
    {
        $this->curl->setUserAgent('BaiDuSpider');
        $this->curl->setHeader('X-Requested-With', 'XMLHttpRequest');
        $this->curl->setOpt(CURLOPT_SSL_VERIFYPEER, false);
        $this->curl->get($url);

        if ($this->curl->error) {
            echo 'Error: ' . $this->curl->errorCode . ': ' . $this->curl->errorMessage . "\n";

            return false;
        } else {
            if ($this->curl->httpStatusCode != 200) {
                echo "Error: response code is " . $this->curl->httpStatusCode . "\n";

                return false;
            } else {
                return $this->curl->response;
            }
        }
    }

    /**
     * 解析 html
     *
     * @param string $html
     * @param string $titleParser
     * @param string $dateParser
     *
     * @return array
     */
    public function parseHtml($html, $titleParser, $dateParser)
    {
        $htmlParser = new HTML5();
        $dom = $htmlParser->loadHTML($html);
        $query = new DOMQuery($dom);
        $query->find($titleParser)->each(function ($index, $item) {
            $this->content[$index]['title'] = htmlspecialchars_decode($item->textContent);
        });

        $query->find($dateParser)->each(function ($index, $item) {
            $this->content[$index]['date'] = $item->textContent;
        });

        return $this->content;
    }

    /**
     * 写入文件
     *
     * @param string $data
     */
    public function writeLog($data)
    {
        $logFile = $this->config['logPath'] . 'news.json';
        echo "info: Success! News data is $data \n";

        file_put_contents($logFile, $data);
    }
}
