console.log(process.argv);  // 會得到一個陣列。 

/* 在終端下指令node practice/argv01.js abc def --aaa，會得到一個陣列如下
[
    '/usr/local/bin/node',
    '/Users/yungchen/Desktop/mfee23-node/practice/argv01.js',
    'abc',
    'def',
    '--aaa'
]
*/


// process.env 意思是可以取得作業系統的環境變數
// process.argv 意思是 執行程式時後面給的參數。 他可以依據空格去查看後面有哪些參數