#Get token
$DOCKER_USERNAME="replace_user"
$DOCKER_PASSWORD="replace_pass"
$HEADERS = @{
             "Content-Type" = "application/json";
            };
$BODY = @{
          username = "$DOCKER_USERNAME"
          password = "$DOCKER_PASSWORD"
         } | ConvertTo-Json
$URL = "https://hub.docker.com/v2/users/login/"
$RESULTS = Invoke-RestMethod -Body $BODY -Headers $HEADERS -Uri $URL -Method Post
$TOKEN = $RESULTS.token
$HEADERS = @{
             "Authorization" = "JWT $TOKEN";
            };

#Get list of images from a given repository
$URL = "https://hub.docker.com/v2/repositories/$DOCKER_USERNAME/?page_size=100"
$RESULTS = Invoke-RestMethod -Headers $HEADERS -Uri $URL -Method Get
$IMAGENS = $RESULTS.results

#Get list of tags from a given image
$IMAGE_NAME = "replace_image"
$URL = "https://hub.docker.com/v2/repositories/$IMAGE_NAME/tags/?page_size=100"
$RESULTS = Invoke-RestMethod -Headers $HEADERS -Uri $URL -Method Get
$TAGS = $RESULTS.results
Write-Host Image `t Last Pulled
foreach($tag in $TAGS)
    {
	Write-Host ("{0} `t {1}" -f $tag.name, $tag.tag_last_pulled)
	}

$FORMAT = "MM/dd/yyyy HH:mm:ss";
$DAYS = replace_days

# delete a list of tags if it is older then "$DAYS"
$LAST_TAGS = $TAGS.Where({[datetime]::ParseExact($_.tag_last_pulled, $FORMAT, $null) -lt [datetime]::ParseExact($(Get-Date).AddDays(-$DAYS), $FORMAT, $null)})
if ($LAST_TAGS.Count -eq 0)
{
	Write-Host "No tags to delete from $IMAGE_NAME."
	exit 0
}
foreach($tag in $LAST_TAGS)
    {
	$name = $tag.name
	Write-Host "Deleting $name tag from $IMAGE_NAME"
	$URL = "https://hub.docker.com/v2/repositories/$IMAGE_NAME/tags/$name/"
	#Invoke-RestMethod -Headers $HEADERS -Uri $URL -Method Get
	Invoke-RestMethod -Headers $HEADERS -Uri $URL -Method Delete
	}
