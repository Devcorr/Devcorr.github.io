<p align="center">
	<a href="http://devcorr.com">
		<img src="http://devcorr.com/images/logo.png"/>
	</a>
</p>
<p align="center">
	<h2 align="center">As a devcorr developer, here is how to deploy updates to devcorr.com!</h2>
	<p>
		Checkout or clone the &quot;dev&quot; branch of this repository and make sure it is up to date.
		Make your changes and check them locally by firing up the vagrant machine here.
		Commit your changes to the &quot;dev&quot; branch.
		Then run the ansible tasks to deploy your changes live to github pages!
	</p>
	<code>ansible-playbook -i local githubPages.yml</code>
</p>
