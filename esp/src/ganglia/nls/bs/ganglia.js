



<!DOCTYPE html>
<html lang="en" class="">
  <head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# object: http://ogp.me/ns/object# article: http://ogp.me/ns/article# profile: http://ogp.me/ns/profile#">
    <meta charset='utf-8'>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta http-equiv="Content-Language" content="en">
    
    
    <title>HPCC-Platform/ganglia.js at 4f1e1657eeb54a9b124951d73d9e6ef1006ac574 · miguelvazq/HPCC-Platform · GitHub</title>
    <link rel="search" type="application/opensearchdescription+xml" href="/opensearch.xml" title="GitHub">
    <link rel="fluid-icon" href="https://github.com/fluidicon.png" title="GitHub">
    <link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon-114.png">
    <link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-114.png">
    <link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon-144.png">
    <link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-144.png">
    <meta property="fb:app_id" content="1401488693436528">

      <meta content="@github" name="twitter:site" /><meta content="summary" name="twitter:card" /><meta content="miguelvazq/HPCC-Platform" name="twitter:title" /><meta content="HPCC-Platform - IMPORTANT - Issue tracking has been migrated to JIRA - use your github ID and password reset mechanism to log in" name="twitter:description" /><meta content="https://avatars2.githubusercontent.com/u/2362956?v=3&amp;s=400" name="twitter:image:src" />
<meta content="GitHub" property="og:site_name" /><meta content="object" property="og:type" /><meta content="https://avatars2.githubusercontent.com/u/2362956?v=3&amp;s=400" property="og:image" /><meta content="miguelvazq/HPCC-Platform" property="og:title" /><meta content="https://github.com/miguelvazq/HPCC-Platform" property="og:url" /><meta content="HPCC-Platform - IMPORTANT - Issue tracking has been migrated to JIRA - use your github ID and password reset mechanism to log in" property="og:description" />

      <meta name="browser-stats-url" content="/_stats">
    <link rel="assets" href="https://assets-cdn.github.com/">
    <link rel="conduit-xhr" href="https://ghconduit.com:25035">
    
    <meta name="pjax-timeout" content="1000">
    

    <meta name="msapplication-TileImage" content="/windows-tile.png">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="selected-link" value="repo_source" data-pjax-transient>
      <meta name="google-analytics" content="UA-3769691-2">

    <meta content="collector.githubapp.com" name="octolytics-host" /><meta content="collector-cdn.github.com" name="octolytics-script-host" /><meta content="github" name="octolytics-app-id" /><meta content="D1F33769:6F6C:1B2D013:5474CD23" name="octolytics-dimension-request_id" />
    
    <meta content="Rails, view, blob#show" name="analytics-event" />

    
    
    <link rel="icon" type="image/x-icon" href="https://assets-cdn.github.com/favicon.ico">


    <meta content="authenticity_token" name="csrf-param" />
<meta content="M+8td2LUpWklZf2quWdux+p9o6eojfAYp67Sie5C5TjFIQVNvxMEw/HwZyJoAmQqhsckk1/b2S/r9HYrsdXiEA==" name="csrf-token" />

    <link href="https://assets-cdn.github.com/assets/github-5561576deeeba73b1c76a1de3c562f5d65ee6ea990aa632c3b75c3a7c811ea3a.css" media="all" rel="stylesheet" type="text/css" />
    <link href="https://assets-cdn.github.com/assets/github2-8b922a51411bd139fd6c83861e8c0a4568e7192869563d83ffadaca58d30b0b0.css" media="all" rel="stylesheet" type="text/css" />
    
    


    <meta http-equiv="x-pjax-version" content="12df89af9394c99545e8f23f6e69246c">

      
  <meta name="description" content="HPCC-Platform - IMPORTANT - Issue tracking has been migrated to JIRA - use your github ID and password reset mechanism to log in">
  <meta name="go-import" content="github.com/miguelvazq/HPCC-Platform git https://github.com/miguelvazq/HPCC-Platform.git">

  <meta content="2362956" name="octolytics-dimension-user_id" /><meta content="miguelvazq" name="octolytics-dimension-user_login" /><meta content="5951538" name="octolytics-dimension-repository_id" /><meta content="miguelvazq/HPCC-Platform" name="octolytics-dimension-repository_nwo" /><meta content="true" name="octolytics-dimension-repository_public" /><meta content="true" name="octolytics-dimension-repository_is_fork" /><meta content="2030681" name="octolytics-dimension-repository_parent_id" /><meta content="hpcc-systems/HPCC-Platform" name="octolytics-dimension-repository_parent_nwo" /><meta content="2030681" name="octolytics-dimension-repository_network_root_id" /><meta content="hpcc-systems/HPCC-Platform" name="octolytics-dimension-repository_network_root_nwo" />
  <link href="https://github.com/miguelvazq/HPCC-Platform/commits/4f1e1657eeb54a9b124951d73d9e6ef1006ac574.atom" rel="alternate" title="Recent Commits to HPCC-Platform:4f1e1657eeb54a9b124951d73d9e6ef1006ac574" type="application/atom+xml">

  </head>


  <body class="logged_out  env-production  vis-public fork page-blob">
    <a href="#start-of-content" tabindex="1" class="accessibility-aid js-skip-to-content">Skip to content</a>
    <div class="wrapper">
      
      
      
      


      
      <div class="header header-logged-out" role="banner">
  <div class="container clearfix">

    <a class="header-logo-wordmark" href="https://github.com/" ga-data-click="(Logged out) Header, go to homepage, icon:logo-wordmark">
      <span class="mega-octicon octicon-logo-github"></span>
    </a>

    <div class="header-actions" role="navigation">
        <a class="button primary" href="/join" data-ga-click="(Logged out) Header, clicked Sign up, text:sign-up">Sign up</a>
      <a class="button" href="/login?return_to=%2Fmiguelvazq%2FHPCC-Platform%2Fblob%2F4f1e1657eeb54a9b124951d73d9e6ef1006ac574%2Fesp%2Fsrc%2Fganglia%2Fnls%2Fbs%2Fganglia.js" data-ga-click="(Logged out) Header, clicked Sign in, text:sign-in">Sign in</a>
    </div>

    <div class="site-search repo-scope js-site-search" role="search">
      <form accept-charset="UTF-8" action="/miguelvazq/HPCC-Platform/search" class="js-site-search-form" data-global-search-url="/search" data-repo-search-url="/miguelvazq/HPCC-Platform/search" method="get"><div style="margin:0;padding:0;display:inline"><input name="utf8" type="hidden" value="&#x2713;" /></div>
  <input type="text"
    class="js-site-search-field is-clearable"
    data-hotkey="s"
    name="q"
    placeholder="Search"
    data-global-scope-placeholder="Search GitHub"
    data-repo-scope-placeholder="Search"
    tabindex="1"
    autocapitalize="off">
  <div class="scope-badge">This repository</div>
</form>
    </div>

      <ul class="header-nav left" role="navigation">
          <li class="header-nav-item">
            <a class="header-nav-link" href="/explore" data-ga-click="(Logged out) Header, go to explore, text:explore">Explore</a>
          </li>
          <li class="header-nav-item">
            <a class="header-nav-link" href="/features" data-ga-click="(Logged out) Header, go to features, text:features">Features</a>
          </li>
          <li class="header-nav-item">
            <a class="header-nav-link" href="https://enterprise.github.com/" data-ga-click="(Logged out) Header, go to enterprise, text:enterprise">Enterprise</a>
          </li>
          <li class="header-nav-item">
            <a class="header-nav-link" href="/blog" data-ga-click="(Logged out) Header, go to blog, text:blog">Blog</a>
          </li>
      </ul>

  </div>
</div>



      <div id="start-of-content" class="accessibility-aid"></div>
          <div class="site" itemscope itemtype="http://schema.org/WebPage">
    <div id="js-flash-container">
      
    </div>
    <div class="pagehead repohead instapaper_ignore readability-menu">
      <div class="container">
        
<ul class="pagehead-actions">


  <li>
      <a href="/login?return_to=%2Fmiguelvazq%2FHPCC-Platform"
    class="minibutton with-count star-button tooltipped tooltipped-n"
    aria-label="You must be signed in to star a repository" rel="nofollow">
    <span class="octicon octicon-star"></span>
    Star
  </a>

    <a class="social-count js-social-count" href="/miguelvazq/HPCC-Platform/stargazers">
      1
    </a>

  </li>

    <li>
      <a href="/login?return_to=%2Fmiguelvazq%2FHPCC-Platform"
        class="minibutton with-count js-toggler-target fork-button tooltipped tooltipped-n"
        aria-label="You must be signed in to fork a repository" rel="nofollow">
        <span class="octicon octicon-repo-forked"></span>
        Fork
      </a>
      <a href="/miguelvazq/HPCC-Platform/network" class="social-count">
        95
      </a>
    </li>
</ul>

        <h1 itemscope itemtype="http://data-vocabulary.org/Breadcrumb" class="entry-title public">
          <span class="mega-octicon octicon-repo-forked"></span>
          <span class="author"><a href="/miguelvazq" class="url fn" itemprop="url" rel="author"><span itemprop="title">miguelvazq</span></a></span><!--
       --><span class="path-divider">/</span><!--
       --><strong><a href="/miguelvazq/HPCC-Platform" class="js-current-repository" data-pjax="#js-repo-pjax-container">HPCC-Platform</a></strong>

          <span class="page-context-loader">
            <img alt="" height="16" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
          </span>

            <span class="fork-flag">
              <span class="text">forked from <a href="/hpcc-systems/HPCC-Platform">hpcc-systems/HPCC-Platform</a></span>
            </span>
        </h1>
      </div><!-- /.container -->
    </div><!-- /.repohead -->

    <div class="container">
      <div class="repository-with-sidebar repo-container new-discussion-timeline  ">
        <div class="repository-sidebar clearfix">
            
<nav class="sunken-menu repo-nav js-repo-nav js-sidenav-container-pjax js-octicon-loaders"
     role="navigation"
     data-pjax="#js-repo-pjax-container"
     data-issue-count-url="/miguelvazq/HPCC-Platform/issues/counts">
  <ul class="sunken-menu-group">
    <li class="tooltipped tooltipped-w" aria-label="Code">
      <a href="/miguelvazq/HPCC-Platform" aria-label="Code" class="selected js-selected-navigation-item sunken-menu-item" data-hotkey="g c" data-selected-links="repo_source repo_downloads repo_commits repo_releases repo_tags repo_branches /miguelvazq/HPCC-Platform">
        <span class="octicon octicon-code"></span> <span class="full-word">Code</span>
        <img alt="" class="mini-loader" height="16" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
</a>    </li>


    <li class="tooltipped tooltipped-w" aria-label="Pull Requests">
      <a href="/miguelvazq/HPCC-Platform/pulls" aria-label="Pull Requests" class="js-selected-navigation-item sunken-menu-item" data-hotkey="g p" data-selected-links="repo_pulls /miguelvazq/HPCC-Platform/pulls">
          <span class="octicon octicon-git-pull-request"></span> <span class="full-word">Pull Requests</span>
          <span class="js-pull-replace-counter"></span>
          <img alt="" class="mini-loader" height="16" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
</a>    </li>


      <li class="tooltipped tooltipped-w" aria-label="Wiki">
        <a href="/miguelvazq/HPCC-Platform/wiki" aria-label="Wiki" class="js-selected-navigation-item sunken-menu-item" data-hotkey="g w" data-selected-links="repo_wiki /miguelvazq/HPCC-Platform/wiki">
          <span class="octicon octicon-book"></span> <span class="full-word">Wiki</span>
          <img alt="" class="mini-loader" height="16" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
</a>      </li>
  </ul>
  <div class="sunken-menu-separator"></div>
  <ul class="sunken-menu-group">

    <li class="tooltipped tooltipped-w" aria-label="Pulse">
      <a href="/miguelvazq/HPCC-Platform/pulse" aria-label="Pulse" class="js-selected-navigation-item sunken-menu-item" data-selected-links="pulse /miguelvazq/HPCC-Platform/pulse">
        <span class="octicon octicon-pulse"></span> <span class="full-word">Pulse</span>
        <img alt="" class="mini-loader" height="16" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
</a>    </li>

    <li class="tooltipped tooltipped-w" aria-label="Graphs">
      <a href="/miguelvazq/HPCC-Platform/graphs" aria-label="Graphs" class="js-selected-navigation-item sunken-menu-item" data-selected-links="repo_graphs repo_contributors /miguelvazq/HPCC-Platform/graphs">
        <span class="octicon octicon-graph"></span> <span class="full-word">Graphs</span>
        <img alt="" class="mini-loader" height="16" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
</a>    </li>
  </ul>


</nav>

              <div class="only-with-full-nav">
                
  
<div class="clone-url open"
  data-protocol-type="http"
  data-url="/users/set_protocol?protocol_selector=http&amp;protocol_type=clone">
  <h3><span class="text-emphasized">HTTPS</span> clone URL</h3>
  <div class="input-group">
    <input type="text" class="input-mini input-monospace js-url-field"
           value="https://github.com/miguelvazq/HPCC-Platform.git" readonly="readonly">
    <span class="input-group-button">
      <button aria-label="Copy to clipboard" class="js-zeroclipboard minibutton zeroclipboard-button" data-clipboard-text="https://github.com/miguelvazq/HPCC-Platform.git" data-copied-hint="Copied!" type="button"><span class="octicon octicon-clippy"></span></button>
    </span>
  </div>
</div>

  
<div class="clone-url "
  data-protocol-type="subversion"
  data-url="/users/set_protocol?protocol_selector=subversion&amp;protocol_type=clone">
  <h3><span class="text-emphasized">Subversion</span> checkout URL</h3>
  <div class="input-group">
    <input type="text" class="input-mini input-monospace js-url-field"
           value="https://github.com/miguelvazq/HPCC-Platform" readonly="readonly">
    <span class="input-group-button">
      <button aria-label="Copy to clipboard" class="js-zeroclipboard minibutton zeroclipboard-button" data-clipboard-text="https://github.com/miguelvazq/HPCC-Platform" data-copied-hint="Copied!" type="button"><span class="octicon octicon-clippy"></span></button>
    </span>
  </div>
</div>


<p class="clone-options">You can clone with
      <a href="#" class="js-clone-selector" data-protocol="http">HTTPS</a>
      or <a href="#" class="js-clone-selector" data-protocol="subversion">Subversion</a>.
  <a href="https://help.github.com/articles/which-remote-url-should-i-use" class="help tooltipped tooltipped-n" aria-label="Get help on which URL is right for you.">
    <span class="octicon octicon-question"></span>
  </a>
</p>



                <a href="/miguelvazq/HPCC-Platform/archive/4f1e1657eeb54a9b124951d73d9e6ef1006ac574.zip"
                   class="minibutton sidebar-button"
                   aria-label="Download the contents of miguelvazq/HPCC-Platform as a zip file"
                   title="Download the contents of miguelvazq/HPCC-Platform as a zip file"
                   rel="nofollow">
                  <span class="octicon octicon-cloud-download"></span>
                  Download ZIP
                </a>
              </div>
        </div><!-- /.repository-sidebar -->

        <div id="js-repo-pjax-container" class="repository-content context-loader-container" data-pjax-container>
          

<a href="/miguelvazq/HPCC-Platform/blob/4f1e1657eeb54a9b124951d73d9e6ef1006ac574/esp/src/ganglia/nls/bs/ganglia.js" class="hidden js-permalink-shortcut" data-hotkey="y">Permalink</a>

<!-- blob contrib key: blob_contributors:v21:2a4e4a5a026a2c2a9b7515cd3e5db305 -->

<div class="file-navigation">
  
<div class="select-menu js-menu-container js-select-menu left">
  <span class="minibutton select-menu-button js-menu-target css-truncate" data-hotkey="w"
    data-master-branch="master"
    data-ref=""
    title=""
    role="button" aria-label="Switch branches or tags" tabindex="0" aria-haspopup="true">
    <span class="octicon octicon-git-branch"></span>
    <i>tree:</i>
    <span class="js-select-button css-truncate-target">4f1e1657ee</span>
  </span>

  <div class="select-menu-modal-holder js-menu-content js-navigation-container" data-pjax aria-hidden="true">

    <div class="select-menu-modal">
      <div class="select-menu-header">
        <span class="select-menu-title">Switch branches/tags</span>
        <span class="octicon octicon-x js-menu-close" role="button" aria-label="Close"></span>
      </div> <!-- /.select-menu-header -->

      <div class="select-menu-filters">
        <div class="select-menu-text-filter">
          <input type="text" aria-label="Filter branches/tags" id="context-commitish-filter-field" class="js-filterable-field js-navigation-enable" placeholder="Filter branches/tags">
        </div>
        <div class="select-menu-tabs">
          <ul>
            <li class="select-menu-tab">
              <a href="#" data-tab-filter="branches" class="js-select-menu-tab">Branches</a>
            </li>
            <li class="select-menu-tab">
              <a href="#" data-tab-filter="tags" class="js-select-menu-tab">Tags</a>
            </li>
          </ul>
        </div><!-- /.select-menu-tabs -->
      </div><!-- /.select-menu-filters -->

      <div class="select-menu-list select-menu-tab-bucket js-select-menu-tab-bucket" data-tab-filter="branches">

        <div data-filterable-for="context-commitish-filter-field" data-filterable-type="substring">


            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/CherryPickForChris/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="CherryPickForChris"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="CherryPickForChris">CherryPickForChris</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/ECLWatch_4/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="ECLWatch_4"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="ECLWatch_4">ECLWatch_4</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/Event/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="Event"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="Event">Event</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/GangliaIntegration/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="GangliaIntegration"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="GangliaIntegration">GangliaIntegration</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/GangliaPackaging/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="GangliaPackaging"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="GangliaPackaging">GangliaPackaging</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/HPCC-1845/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="HPCC-1845"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="HPCC-1845">HPCC-1845</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/HPCC-2851/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="HPCC-2851"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="HPCC-2851">HPCC-2851</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/HPCC-3146/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="HPCC-3146"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="HPCC-3146">HPCC-3146</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/HPCC-7898/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="HPCC-7898"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="HPCC-7898">HPCC-7898</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/HPCC-7899/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="HPCC-7899"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="HPCC-7899">HPCC-7899</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/HPCC-7984/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="HPCC-7984"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="HPCC-7984">HPCC-7984</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/HPCC-8044/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="HPCC-8044"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="HPCC-8044">HPCC-8044</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/HPCC-8583/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="HPCC-8583"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="HPCC-8583">HPCC-8583</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/HPCC-8804/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="HPCC-8804"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="HPCC-8804">HPCC-8804</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/HPCC-8886/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="HPCC-8886"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="HPCC-8886">HPCC-8886</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/HPCC-8887/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="HPCC-8887"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="HPCC-8887">HPCC-8887</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/HPCC-8972/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="HPCC-8972"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="HPCC-8972">HPCC-8972</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/HPCC-9121/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="HPCC-9121"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="HPCC-9121">HPCC-9121</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/HPCC-9247/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="HPCC-9247"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="HPCC-9247">HPCC-9247</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/HPCC-9267/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="HPCC-9267"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="HPCC-9267">HPCC-9267</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/HPCC-9276/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="HPCC-9276"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="HPCC-9276">HPCC-9276</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/HPCC-9334/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="HPCC-9334"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="HPCC-9334">HPCC-9334</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/HPCC-9347/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="HPCC-9347"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="HPCC-9347">HPCC-9347</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/HPCC-9450/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="HPCC-9450"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="HPCC-9450">HPCC-9450</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/HPCC-9647/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="HPCC-9647"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="HPCC-9647">HPCC-9647</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/HPCC-9654/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="HPCC-9654"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="HPCC-9654">HPCC-9654</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/HPCC-9671/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="HPCC-9671"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="HPCC-9671">HPCC-9671</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/HPCC-9680/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="HPCC-9680"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="HPCC-9680">HPCC-9680</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/HPCC-9868/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="HPCC-9868"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="HPCC-9868">HPCC-9868</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/HPCC-9934/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="HPCC-9934"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="HPCC-9934">HPCC-9934</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/HPCC-10174/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="HPCC-10174"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="HPCC-10174">HPCC-10174</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/HPCC-10266/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="HPCC-10266"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="HPCC-10266">HPCC-10266</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/HPCC-10272/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="HPCC-10272"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="HPCC-10272">HPCC-10272</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/HPCC-10273/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="HPCC-10273"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="HPCC-10273">HPCC-10273</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/HPCC-10321/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="HPCC-10321"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="HPCC-10321">HPCC-10321</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/HPCC-10325/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="HPCC-10325"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="HPCC-10325">HPCC-10325</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/HPCC-10342/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="HPCC-10342"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="HPCC-10342">HPCC-10342</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/HPCC-10381/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="HPCC-10381"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="HPCC-10381">HPCC-10381</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/HPCC-10387/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="HPCC-10387"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="HPCC-10387">HPCC-10387</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/HPCC-10406/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="HPCC-10406"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="HPCC-10406">HPCC-10406</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/HPCC-10407/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="HPCC-10407"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="HPCC-10407">HPCC-10407</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/HPCC-10493/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="HPCC-10493"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="HPCC-10493">HPCC-10493</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/HPCC-10747/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="HPCC-10747"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="HPCC-10747">HPCC-10747</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/HPCC-10780/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="HPCC-10780"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="HPCC-10780">HPCC-10780</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/HPCC-10786/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="HPCC-10786"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="HPCC-10786">HPCC-10786</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/HPCC-10786-1/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="HPCC-10786-1"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="HPCC-10786-1">HPCC-10786-1</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/HPCC-10807/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="HPCC-10807"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="HPCC-10807">HPCC-10807</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/HPCC-10807-1/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="HPCC-10807-1"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="HPCC-10807-1">HPCC-10807-1</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/HPCC-10823/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="HPCC-10823"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="HPCC-10823">HPCC-10823</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/HPCC-10936/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="HPCC-10936"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="HPCC-10936">HPCC-10936</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/HPCC-10943/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="HPCC-10943"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="HPCC-10943">HPCC-10943</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/HPCC-11102/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="HPCC-11102"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="HPCC-11102">HPCC-11102</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/HPCC-11122/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="HPCC-11122"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="HPCC-11122">HPCC-11122</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/HPCC-11150/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="HPCC-11150"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="HPCC-11150">HPCC-11150</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/HPCC-11221/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="HPCC-11221"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="HPCC-11221">HPCC-11221</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/HPCC-11353/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="HPCC-11353"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="HPCC-11353">HPCC-11353</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/HPCC-11424/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="HPCC-11424"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="HPCC-11424">HPCC-11424</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/HPCC-11432/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="HPCC-11432"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="HPCC-11432">HPCC-11432</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/HPCC-11506/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="HPCC-11506"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="HPCC-11506">HPCC-11506</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/HPCC-11506.1/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="HPCC-11506.1"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="HPCC-11506.1">HPCC-11506.1</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/HPCC-11529/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="HPCC-11529"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="HPCC-11529">HPCC-11529</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/HPCC-11539/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="HPCC-11539"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="HPCC-11539">HPCC-11539</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/HPCC-11663/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="HPCC-11663"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="HPCC-11663">HPCC-11663</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/HPCC-11667/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="HPCC-11667"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="HPCC-11667">HPCC-11667</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/HPCC-11668/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="HPCC-11668"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="HPCC-11668">HPCC-11668</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/HPCC-11716/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="HPCC-11716"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="HPCC-11716">HPCC-11716</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/HPCC-11767/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="HPCC-11767"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="HPCC-11767">HPCC-11767</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/HPCC-11789/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="HPCC-11789"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="HPCC-11789">HPCC-11789</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/HPCC-12065/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="HPCC-12065"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="HPCC-12065">HPCC-12065</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/HPCC-12234/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="HPCC-12234"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="HPCC-12234">HPCC-12234</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/HPCC-12445/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="HPCC-12445"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="HPCC-12445">HPCC-12445</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/HPCC-12463/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="HPCC-12463"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="HPCC-12463">HPCC-12463</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/HPCC-12468/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="HPCC-12468"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="HPCC-12468">HPCC-12468</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/LDAPWork/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="LDAPWork"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="LDAPWork">LDAPWork</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/LandingZoneOverwrite/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="LandingZoneOverwrite"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="LandingZoneOverwrite">LandingZoneOverwrite</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/MyECLWatch_4/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="MyECLWatch_4"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="MyECLWatch_4">MyECLWatch_4</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/QuerieSetWork/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="QuerieSetWork"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="QuerieSetWork">QuerieSetWork</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/QueriesWidget/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="QueriesWidget"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="QueriesWidget">QueriesWidget</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/RoxieQueriesWork/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="RoxieQueriesWork"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="RoxieQueriesWork">RoxieQueriesWork</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/RoxyQuery/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="RoxyQuery"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="RoxyQuery">RoxyQuery</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/SuperKeys/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="SuperKeys"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="SuperKeys">SuperKeys</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/TargetQueries/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="TargetQueries"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="TargetQueries">TargetQueries</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/UsersWidget/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="UsersWidget"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="UsersWidget">UsersWidget</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/ZapButton/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="ZapButton"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="ZapButton">ZapButton</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/allowForeign/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="allowForeign"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="allowForeign">allowForeign</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/candidate-3.2.x/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="candidate-3.2.x"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="candidate-3.2.x">candidate-3.2.x</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/candidate-3.4.0/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="candidate-3.4.0"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="candidate-3.4.0">candidate-3.4.0</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/candidate-3.4.2/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="candidate-3.4.2"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="candidate-3.4.2">candidate-3.4.2</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/candidate-3.4.x/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="candidate-3.4.x"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="candidate-3.4.x">candidate-3.4.x</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/candidate-3.6.0/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="candidate-3.6.0"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="candidate-3.6.0">candidate-3.6.0</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/candidate-3.6.2/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="candidate-3.6.2"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="candidate-3.6.2">candidate-3.6.2</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/candidate-3.6.x/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="candidate-3.6.x"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="candidate-3.6.x">candidate-3.6.x</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/candidate-3.8.0/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="candidate-3.8.0"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="candidate-3.8.0">candidate-3.8.0</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/candidate-3.8.2/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="candidate-3.8.2"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="candidate-3.8.2">candidate-3.8.2</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/candidate-3.8.4/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="candidate-3.8.4"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="candidate-3.8.4">candidate-3.8.4</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/candidate-3.8.x/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="candidate-3.8.x"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="candidate-3.8.x">candidate-3.8.x</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/candidate-3.10.x/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="candidate-3.10.x"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="candidate-3.10.x">candidate-3.10.x</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/changezapcall/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="changezapcall"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="changezapcall">changezapcall</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/docsplit-3.6/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="docsplit-3.6"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="docsplit-3.6">docsplit-3.6</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/gleb_cherry_2940/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="gleb_cherry_2940"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="gleb_cherry_2940">gleb_cherry_2940</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/gordonmainpage/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="gordonmainpage"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="gordonmainpage">gordonmainpage</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/gordonmainpage2/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="gordonmainpage2"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="gordonmainpage2">gordonmainpage2</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/iss1845/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="iss1845"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="iss1845">iss1845</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/issue_1845/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="issue_1845"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="issue_1845">issue_1845</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/latestandgreatest/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="latestandgreatest"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="latestandgreatest">latestandgreatest</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/master/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="master"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="master">master</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/mynewbranch/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="mynewbranch"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="mynewbranch">mynewbranch</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/newmainpage/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="newmainpage"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="newmainpage">newmainpage</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/origin/HPCC-9267/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="origin/HPCC-9267"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="origin/HPCC-9267">origin/HPCC-9267</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/origin/HPCC-10807/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="origin/HPCC-10807"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="origin/HPCC-10807">origin/HPCC-10807</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/release-3.2.0/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="release-3.2.0"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="release-3.2.0">release-3.2.0</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/release-3.2.2/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="release-3.2.2"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="release-3.2.2">release-3.2.2</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/spanishIntl/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="spanishIntl"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="spanishIntl">spanishIntl</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/spanishIntl2/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="spanishIntl2"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="spanishIntl2">spanishIntl2</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/split-3.2/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="split-3.2"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="split-3.2">split-3.2</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/split-3.4/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="split-3.4"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="split-3.4">split-3.4</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/stable/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="stable"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="stable">stable</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/stubTitle/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="stubTitle"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="stubTitle">stubTitle</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/tablelayoutwork/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="tablelayoutwork"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="tablelayoutwork">tablelayoutwork</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/testZAp/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="testZAp"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="testZAp">testZAp</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/testing/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="testing"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="testing">testing</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/testingGordonPluginWork/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="testingGordonPluginWork"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="testingGordonPluginWork">testingGordonPluginWork</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/blob/width/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="width"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="width">width</a>
            </div> <!-- /.select-menu-item -->
        </div>

          <div class="select-menu-no-results">Nothing to show</div>
      </div> <!-- /.select-menu-list -->

      <div class="select-menu-list select-menu-tab-bucket js-select-menu-tab-bucket" data-tab-filter="tags">
        <div data-filterable-for="context-commitish-filter-field" data-filterable-type="substring">


            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/tree/community_3.8.4-3rc/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="community_3.8.4-3rc"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="community_3.8.4-3rc">community_3.8.4-3rc</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/tree/community_3.8.4-2rc/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="community_3.8.4-2rc"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="community_3.8.4-2rc">community_3.8.4-2rc</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/tree/community_3.8.4-1rc/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="community_3.8.4-1rc"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="community_3.8.4-1rc">community_3.8.4-1rc</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/tree/community_3.8.2-4rc/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="community_3.8.2-4rc"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="community_3.8.2-4rc">community_3.8.2-4rc</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/tree/community_3.8.2-3rc/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="community_3.8.2-3rc"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="community_3.8.2-3rc">community_3.8.2-3rc</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/tree/community_3.8.2-2rc/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="community_3.8.2-2rc"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="community_3.8.2-2rc">community_3.8.2-2rc</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/tree/community_3.8.2-2/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="community_3.8.2-2"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="community_3.8.2-2">community_3.8.2-2</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/tree/community_3.8.2-1rc/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="community_3.8.2-1rc"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="community_3.8.2-1rc">community_3.8.2-1rc</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/tree/community_3.8.2-1/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="community_3.8.2-1"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="community_3.8.2-1">community_3.8.2-1</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/tree/community_3.8.0-8rc/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="community_3.8.0-8rc"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="community_3.8.0-8rc">community_3.8.0-8rc</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/tree/community_3.8.0-7rc/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="community_3.8.0-7rc"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="community_3.8.0-7rc">community_3.8.0-7rc</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/tree/community_3.8.0-6rc/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="community_3.8.0-6rc"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="community_3.8.0-6rc">community_3.8.0-6rc</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/tree/community_3.8.0-5rc/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="community_3.8.0-5rc"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="community_3.8.0-5rc">community_3.8.0-5rc</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/tree/community_3.8.0-4rc/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="community_3.8.0-4rc"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="community_3.8.0-4rc">community_3.8.0-4rc</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/tree/community_3.8.0-3rc/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="community_3.8.0-3rc"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="community_3.8.0-3rc">community_3.8.0-3rc</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/tree/community_3.8.0-2rc/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="community_3.8.0-2rc"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="community_3.8.0-2rc">community_3.8.0-2rc</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/tree/community_3.8.0-1rc/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="community_3.8.0-1rc"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="community_3.8.0-1rc">community_3.8.0-1rc</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/tree/community_3.8.0-1/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="community_3.8.0-1"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="community_3.8.0-1">community_3.8.0-1</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/tree/community_3.8.0-0rc/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="community_3.8.0-0rc"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="community_3.8.0-0rc">community_3.8.0-0rc</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/tree/community_3.6.2-6rc/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="community_3.6.2-6rc"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="community_3.6.2-6rc">community_3.6.2-6rc</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/tree/community_3.6.2-5rc/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="community_3.6.2-5rc"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="community_3.6.2-5rc">community_3.6.2-5rc</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/tree/community_3.6.2-4rc/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="community_3.6.2-4rc"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="community_3.6.2-4rc">community_3.6.2-4rc</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/tree/community_3.6.2-3rc/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="community_3.6.2-3rc"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="community_3.6.2-3rc">community_3.6.2-3rc</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/tree/community_3.6.2-3/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="community_3.6.2-3"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="community_3.6.2-3">community_3.6.2-3</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/tree/community_3.6.2-2rc/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="community_3.6.2-2rc"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="community_3.6.2-2rc">community_3.6.2-2rc</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/tree/community_3.6.2-2/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="community_3.6.2-2"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="community_3.6.2-2">community_3.6.2-2</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/tree/community_3.6.2-1rc/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="community_3.6.2-1rc"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="community_3.6.2-1rc">community_3.6.2-1rc</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/tree/community_3.6.2-1/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="community_3.6.2-1"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="community_3.6.2-1">community_3.6.2-1</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/tree/community_3.6.0-1/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="community_3.6.0-1"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="community_3.6.0-1">community_3.6.0-1</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/tree/community_3.4.2-1/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="community_3.4.2-1"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="community_3.4.2-1">community_3.4.2-1</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/tree/community_3.4.0-1/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="community_3.4.0-1"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="community_3.4.0-1">community_3.4.0-1</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/tree/community-3.2.2/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="community-3.2.2"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="community-3.2.2">community-3.2.2</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/miguelvazq/HPCC-Platform/tree/community-3.2.0/esp/src/ganglia/nls/bs/ganglia.js"
                 data-name="community-3.2.0"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="community-3.2.0">community-3.2.0</a>
            </div> <!-- /.select-menu-item -->
        </div>

        <div class="select-menu-no-results">Nothing to show</div>
      </div> <!-- /.select-menu-list -->

    </div> <!-- /.select-menu-modal -->
  </div> <!-- /.select-menu-modal-holder -->
</div> <!-- /.select-menu -->

  <div class="button-group right">
    <a href="/miguelvazq/HPCC-Platform/find/4f1e1657eeb54a9b124951d73d9e6ef1006ac574"
          class="js-show-file-finder minibutton empty-icon tooltipped tooltipped-s"
          data-pjax
          data-hotkey="t"
          aria-label="Quickly jump between files">
      <span class="octicon octicon-list-unordered"></span>
    </a>
    <button aria-label="Copy to clipboard" class="js-zeroclipboard minibutton zeroclipboard-button" data-clipboard-text="esp/src/ganglia/nls/bs/ganglia.js" data-copied-hint="Copied!" type="button"><span class="octicon octicon-clippy"></span></button>
  </div>

  <div class="breadcrumb">
    <span class='repo-root js-repo-root'><span itemscope="" itemtype="http://data-vocabulary.org/Breadcrumb"><a href="/miguelvazq/HPCC-Platform/tree/4f1e1657eeb54a9b124951d73d9e6ef1006ac574" class="" data-branch="4f1e1657eeb54a9b124951d73d9e6ef1006ac574" data-direction="back" data-pjax="true" itemscope="url" rel="nofollow"><span itemprop="title">HPCC-Platform</span></a></span></span><span class="separator"> / </span><span itemscope="" itemtype="http://data-vocabulary.org/Breadcrumb"><a href="/miguelvazq/HPCC-Platform/tree/4f1e1657eeb54a9b124951d73d9e6ef1006ac574/esp" class="" data-branch="4f1e1657eeb54a9b124951d73d9e6ef1006ac574" data-direction="back" data-pjax="true" itemscope="url" rel="nofollow"><span itemprop="title">esp</span></a></span><span class="separator"> / </span><span itemscope="" itemtype="http://data-vocabulary.org/Breadcrumb"><a href="/miguelvazq/HPCC-Platform/tree/4f1e1657eeb54a9b124951d73d9e6ef1006ac574/esp/src" class="" data-branch="4f1e1657eeb54a9b124951d73d9e6ef1006ac574" data-direction="back" data-pjax="true" itemscope="url" rel="nofollow"><span itemprop="title">src</span></a></span><span class="separator"> / </span><span itemscope="" itemtype="http://data-vocabulary.org/Breadcrumb"><a href="/miguelvazq/HPCC-Platform/tree/4f1e1657eeb54a9b124951d73d9e6ef1006ac574/esp/src/ganglia" class="" data-branch="4f1e1657eeb54a9b124951d73d9e6ef1006ac574" data-direction="back" data-pjax="true" itemscope="url" rel="nofollow"><span itemprop="title">ganglia</span></a></span><span class="separator"> / </span><span itemscope="" itemtype="http://data-vocabulary.org/Breadcrumb"><a href="/miguelvazq/HPCC-Platform/tree/4f1e1657eeb54a9b124951d73d9e6ef1006ac574/esp/src/ganglia/nls" class="" data-branch="4f1e1657eeb54a9b124951d73d9e6ef1006ac574" data-direction="back" data-pjax="true" itemscope="url" rel="nofollow"><span itemprop="title">nls</span></a></span><span class="separator"> / </span><span itemscope="" itemtype="http://data-vocabulary.org/Breadcrumb"><a href="/miguelvazq/HPCC-Platform/tree/4f1e1657eeb54a9b124951d73d9e6ef1006ac574/esp/src/ganglia/nls/bs" class="" data-branch="4f1e1657eeb54a9b124951d73d9e6ef1006ac574" data-direction="back" data-pjax="true" itemscope="url" rel="nofollow"><span itemprop="title">bs</span></a></span><span class="separator"> / </span><strong class="final-path">ganglia.js</strong>
  </div>
</div>


  <div class="commit file-history-tease">
    <div class="file-history-tease-header">
        <img alt="Miguel Vazquez" class="avatar" data-user="2362956" height="24" src="https://avatars2.githubusercontent.com/u/2362956?v=3&amp;s=48" width="24" />
        <span class="author"><a href="/miguelvazq" rel="author">miguelvazq</a></span>
        <time datetime="2014-11-20T19:08:23Z" is="relative-time">Nov 20, 2014</time>
        <div class="commit-title">
            <a href="/miguelvazq/HPCC-Platform/commit/4f1e1657eeb54a9b124951d73d9e6ef1006ac574" class="message" data-pjax="true" title="Add directories into gordon&#39;s work

Modify my files to work with relative paths
Add remaining translations

Signed-off by: Miguel Vazquez &lt;miguel.vazquez@lexisnexis.com&gt;">Add directories into gordon's work</a>
        </div>
    </div>

    <div class="participation">
      <p class="quickstat">
        <a href="#blob_contributors_box" rel="facebox">
          <strong>1</strong>
           contributor
        </a>
      </p>
      
    </div>
    <div id="blob_contributors_box" style="display:none">
      <h2 class="facebox-header">Users who have contributed to this file</h2>
      <ul class="facebox-user-list">
          <li class="facebox-user-list-item">
            <img alt="Miguel Vazquez" data-user="2362956" height="24" src="https://avatars2.githubusercontent.com/u/2362956?v=3&amp;s=48" width="24" />
            <a href="/miguelvazq">miguelvazq</a>
          </li>
      </ul>
    </div>
  </div>

<div class="file-box">
  <div class="file">
    <div class="meta clearfix">
      <div class="info file-name">
          <span>12 lines (12 sloc)</span>
          <span class="meta-divider"></span>
        <span>0.172 kb</span>
      </div>
      <div class="actions">
        <div class="button-group">
          <a href="/miguelvazq/HPCC-Platform/raw/4f1e1657eeb54a9b124951d73d9e6ef1006ac574/esp/src/ganglia/nls/bs/ganglia.js" class="minibutton " id="raw-url">Raw</a>
            <a href="/miguelvazq/HPCC-Platform/blame/4f1e1657eeb54a9b124951d73d9e6ef1006ac574/esp/src/ganglia/nls/bs/ganglia.js" class="minibutton js-update-url-with-hash">Blame</a>
          <a href="/miguelvazq/HPCC-Platform/commits/4f1e1657eeb54a9b124951d73d9e6ef1006ac574/esp/src/ganglia/nls/bs/ganglia.js" class="minibutton " rel="nofollow">History</a>
        </div><!-- /.button-group -->


            <a class="octicon-button disabled tooltipped tooltipped-w" href="#"
               aria-label="You must be signed in to make or propose changes"><span class="octicon octicon-pencil"></span></a>

          <a class="octicon-button danger disabled tooltipped tooltipped-w" href="#"
             aria-label="You must be signed in to make or propose changes">
          <span class="octicon octicon-trashcan"></span>
        </a>
      </div><!-- /.actions -->
    </div>
    

  <div class="blob-wrapper data type-javascript">
      <table class="highlight tab-size-8 js-file-line-container">
      <tr>
        <td id="L1" class="blob-num js-line-number" data-line-number="1"></td>
        <td id="LC1" class="blob-code js-file-line">define(</td>
      </tr>
      <tr>
        <td id="L2" class="blob-num js-line-number" data-line-number="2"></td>
        <td id="LC2" class="blob-code js-file-line">({</td>
      </tr>
      <tr>
        <td id="L3" class="blob-num js-line-number" data-line-number="3"></td>
        <td id="LC3" class="blob-code js-file-line">    AddMetric<span class="pl-k">:</span> <span class="pl-s1"><span class="pl-pds">&quot;</span><span class="pl-pds">&quot;</span></span>,</td>
      </tr>
      <tr>
        <td id="L4" class="blob-num js-line-number" data-line-number="4"></td>
        <td id="LC4" class="blob-code js-file-line">    CurrentEpoch<span class="pl-k">:</span> <span class="pl-s1"><span class="pl-pds">&quot;</span><span class="pl-pds">&quot;</span></span>,</td>
      </tr>
      <tr>
        <td id="L5" class="blob-num js-line-number" data-line-number="5"></td>
        <td id="LC5" class="blob-code js-file-line">    CustomMonitoring<span class="pl-k">:</span> <span class="pl-s1"><span class="pl-pds">&quot;</span><span class="pl-pds">&quot;</span></span>,</td>
      </tr>
      <tr>
        <td id="L6" class="blob-num js-line-number" data-line-number="6"></td>
        <td id="LC6" class="blob-code js-file-line">    Default<span class="pl-k">:</span> <span class="pl-s1"><span class="pl-pds">&quot;</span><span class="pl-pds">&quot;</span></span>,</td>
      </tr>
      <tr>
        <td id="L7" class="blob-num js-line-number" data-line-number="7"></td>
        <td id="LC7" class="blob-code js-file-line">    Ganglia<span class="pl-k">:</span> <span class="pl-s1"><span class="pl-pds">&quot;</span><span class="pl-pds">&quot;</span></span>,</td>
      </tr>
      <tr>
        <td id="L8" class="blob-num js-line-number" data-line-number="8"></td>
        <td id="LC8" class="blob-code js-file-line">    GenerateGraph<span class="pl-k">:</span> <span class="pl-s1"><span class="pl-pds">&quot;</span><span class="pl-pds">&quot;</span></span>,</td>
      </tr>
      <tr>
        <td id="L9" class="blob-num js-line-number" data-line-number="9"></td>
        <td id="LC9" class="blob-code js-file-line">    Metrics<span class="pl-k">:</span> <span class="pl-s1"><span class="pl-pds">&quot;</span><span class="pl-pds">&quot;</span></span>,</td>
      </tr>
      <tr>
        <td id="L10" class="blob-num js-line-number" data-line-number="10"></td>
        <td id="LC10" class="blob-code js-file-line">    Server<span class="pl-k">:</span> <span class="pl-s1"><span class="pl-pds">&quot;</span><span class="pl-pds">&quot;</span></span></td>
      </tr>
      <tr>
        <td id="L11" class="blob-num js-line-number" data-line-number="11"></td>
        <td id="LC11" class="blob-code js-file-line">})</td>
      </tr>
      <tr>
        <td id="L12" class="blob-num js-line-number" data-line-number="12"></td>
        <td id="LC12" class="blob-code js-file-line">);</td>
      </tr>
</table>

  </div>

  </div>
</div>

<a href="#jump-to-line" rel="facebox[.linejump]" data-hotkey="l" style="display:none">Jump to Line</a>
<div id="jump-to-line" style="display:none">
  <form accept-charset="UTF-8" class="js-jump-to-line-form">
    <input class="linejump-input js-jump-to-line-field" type="text" placeholder="Jump to line&hellip;" autofocus>
    <button type="submit" class="button">Go</button>
  </form>
</div>

        </div>

      </div><!-- /.repo-container -->
      <div class="modal-backdrop"></div>
    </div><!-- /.container -->
  </div><!-- /.site -->


    </div><!-- /.wrapper -->

      <div class="container">
  <div class="site-footer" role="contentinfo">
    <ul class="site-footer-links right">
      <li><a href="https://status.github.com/">Status</a></li>
      <li><a href="https://developer.github.com">API</a></li>
      <li><a href="http://training.github.com">Training</a></li>
      <li><a href="http://shop.github.com">Shop</a></li>
      <li><a href="/blog">Blog</a></li>
      <li><a href="/about">About</a></li>

    </ul>

    <a href="/" aria-label="Homepage">
      <span class="mega-octicon octicon-mark-github" title="GitHub"></span>
    </a>

    <ul class="site-footer-links">
      <li>&copy; 2014 <span title="0.03745s from github-fe120-cp1-prd.iad.github.net">GitHub</span>, Inc.</li>
        <li><a href="/site/terms">Terms</a></li>
        <li><a href="/site/privacy">Privacy</a></li>
        <li><a href="/security">Security</a></li>
        <li><a href="/contact">Contact</a></li>
    </ul>
  </div><!-- /.site-footer -->
</div><!-- /.container -->


    <div class="fullscreen-overlay js-fullscreen-overlay" id="fullscreen_overlay">
  <div class="fullscreen-container js-suggester-container">
    <div class="textarea-wrap">
      <textarea name="fullscreen-contents" id="fullscreen-contents" class="fullscreen-contents js-fullscreen-contents js-suggester-field" placeholder=""></textarea>
    </div>
  </div>
  <div class="fullscreen-sidebar">
    <a href="#" class="exit-fullscreen js-exit-fullscreen tooltipped tooltipped-w" aria-label="Exit Zen Mode">
      <span class="mega-octicon octicon-screen-normal"></span>
    </a>
    <a href="#" class="theme-switcher js-theme-switcher tooltipped tooltipped-w"
      aria-label="Switch themes">
      <span class="octicon octicon-color-mode"></span>
    </a>
  </div>
</div>



    <div id="ajax-error-message" class="flash flash-error">
      <span class="octicon octicon-alert"></span>
      <a href="#" class="octicon octicon-x flash-close js-ajax-error-dismiss" aria-label="Dismiss error"></a>
      Something went wrong with that request. Please try again.
    </div>


      <script crossorigin="anonymous" src="https://assets-cdn.github.com/assets/frameworks-7f435787c64d34f431ff358d1096b34704ba95d90b7ad67bd3a071c9d0d6a438.js" type="text/javascript"></script>
      <script async="async" crossorigin="anonymous" src="https://assets-cdn.github.com/assets/github-7af43e7c48774d57e35fd38f5549da918eb7e940a55d390d9a2cb9c547ac0914.js" type="text/javascript"></script>
      
      
  </body>
</html>

