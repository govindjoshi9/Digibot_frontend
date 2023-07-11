<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
img {
  width: 100%;
  height: auto;
}
</style>
</head>
<body>



<?php  
    if(isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on')   
         $url = "https://";   
    else  
         $url = "http://";   
    // Append the host(domain name, ip) to the URL.   
    $url.= $_SERVER['HTTP_HOST'];   
    
    // Append the requested resource location to the URL   
    $url.= $_SERVER['REQUEST_URI']; 
    $front = '/nftImage/';
    
  ?>   

  
  <img src="<?php echo $front.substr($url,31); ?>" width="460" height="345">


</body>
</html>
