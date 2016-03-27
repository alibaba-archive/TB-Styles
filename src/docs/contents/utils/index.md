---
title: Utils
---

## Overview
自从引入了 Autoprefixer 到预处理器后，省去了 Vendor 相关的 Mixin  
让 Mixin & Util 变得轻量，只为辅助功能而生，减少重复劳动与代码

## Table of Contents
- [Quick floats](#layout-floats)
- [Center content blocks](#layout-center)
- [Clearfix](#layout-clearfix)
- [Visibility](#visibility)
- [Truncating text](#truncating-text)
- [Placeholder color](#placeholder-color)
- [Responsive](#responsive)
- [Miscs](#miscs)
    - [Contextual colors](#miscs-colors)
    - [Contextual backgrounds](#miscs-backgrounds)
    - [Carets](#miscs-carets)
    - [Retina Images](#miscs-retina-images)

## Layout
<h3 id="layout-floats">Quick floats</h3>
  <p>Float an element to the left or right with a class. <code>!important</code> is included to avoid specificity issues. Classes can also be used as mixins.</p>
<div class="highlight"><pre><code class="language-html" data-lang="html"><span class="nt">&lt;div</span> <span class="na">class=</span><span class="s">"pull-left"</span><span class="nt">&gt;</span>...<span class="nt">&lt;/div&gt;</span>
<span class="nt">&lt;div</span> <span class="na">class=</span><span class="s">"pull-right"</span><span class="nt">&gt;</span>...<span class="nt">&lt;/div&gt;</span></code></pre></div>
<div class="highlight"><pre><code class="language-scss" data-lang="scss"><span class="c1">// Classes
</span><span class="nc">.pull-left</span> <span class="p"></span>
  <span class="nl">float</span><span class="p">:</span> <span class="nb">left</span> <span class="o">!</span><span class="n">important</span><span class="p"></span>
<span class="p"></span>
<span class="nc">.pull-right</span> <span class="p"></span>
  <span class="nl">float</span><span class="p">:</span> <span class="nb">right</span> <span class="o">!</span><span class="n">important</span><span class="p"></span>
<span class="p"></span>

<span class="c1">// Usage as mixins
</span><span class="nc">.element</span> <span class="p"></span>
  <span class="nc">pull-left</span><span class="o">()</span><span class="p"></span>
<span class="p"></span>
<span class="nc">.another-element</span> <span class="p"></span>
  <span class="nc">pull-right</span><span class="o">()</span><span class="p"></span>
<span class="p"></span></code></pre></div>

  <div class="bs-callout bs-callout-warning" id="callout-helper-pull-navbar">
    <h4>Not for use in navbars</h4>
    <p>To align components in navbars with utility classes, use <code>.navbar-left</code> or <code>.navbar-right</code> instead. <a href="../generics/#navbar-component-alignment">See the navbar docs</a> for details.</p>
  </div>

  <h3 id="layout-center">Center content blocks</h3>
  <p>Set an element to <code>display: block</code> and center via <code>margin</code>. Available as a mixin and class.</p>
<div class="highlight"><pre><code class="language-html" data-lang="html"><span class="nt">&lt;div</span> <span class="na">class=</span><span class="s">"center-block"</span><span class="nt">&gt;</span>...<span class="nt">&lt;/div&gt;</span></code></pre></div>
<div class="highlight"><pre><code class="language-scss" data-lang="scss"><span class="c1">// Class
</span><span class="nc">.center-block</span> <span class="p"></span>
  <span class="nl">display</span><span class="p">:</span> <span class="nb">block</span><span class="p"></span>
  <span class="nl">margin-left</span><span class="p">:</span> <span class="nb">auto</span><span class="p"></span>
  <span class="nl">margin-right</span><span class="p">:</span> <span class="nb">auto</span><span class="p"></span>
<span class="p"></span>

<span class="c1">// Usage as a mixin
</span><span class="nc">.element</span> <span class="p"></span>
  <span class="nc">center-block</span><span class="o">()</span><span class="p"></span>
<span class="p"></span></code></pre></div>


  <h3 id="layout-clearfix">Clearfix</h3>
  <p>Easily clear <code>float</code>s by adding <code>.clearfix</code> <strong>to the parent element</strong>. Utilizes <a href="http://nicolasgallagher.com/micro-clearfix-hack/" target="_blank">the micro clearfix</a> as popularized by Nicolas Gallagher. Can also be used as a mixin.</p>
<div class="highlight"><pre><code class="language-html" data-lang="html"><span class="c">&lt;!-- Usage as a class --&gt;</span>
<span class="nt">&lt;div</span> <span class="na">class=</span><span class="s">"clearfix"</span><span class="nt">&gt;</span>...<span class="nt">&lt;/div&gt;</span></code></pre></div>
<div class="highlight"><pre><code class="language-scss" data-lang="scss"><span class="c1">// Mixin itself
</span><span class="nc">clearfix</span><span class="o">()</span> <span class="p"></span>
  <span class="k">&amp;</span><span class="nd">:before</span><span class="o">,</span>
  <span class="k">&amp;</span><span class="nd">:after</span> <span class="p"></span>
    <span class="nl">content</span><span class="p">:</span> <span class="s2">" "</span><span class="p"></span>
    <span class="nl">display</span><span class="p">:</span> <span class="n">table</span><span class="p"></span>
  <span class="p"></span>
  <span class="k">&amp;</span><span class="nd">:after</span> <span class="p"></span>
    <span class="nl">clear</span><span class="p">:</span> <span class="nb">both</span><span class="p"></span>
  <span class="p"></span>

<span class="c1">// Usage as a mixin
</span><span class="nc">.element</span> <span class="p"></span>
  <span class="nc">clearfix</span><span class="o">()</span><span class="p"></span>
<span class="p"></span></code></pre></div>

## Visibility
<p class="alert alert-danger">Only Classes</p>
<p>Force an element to be shown or hidden with the use of <code>.show</code> and <code>.hidden</code> classes. These classes use <code>!important</code> to avoid specificity conflicts, just like the <a href="#helper-classes-floats">quick floats</a>. They are only available for block level toggling. They can also be used as mixins.</p>
  <p>Furthermore, <code>.invisible</code> can be used to toggle only the visibility of an element, meaning its <code>display</code> is not modified and the element can still affect the flow of the document.</p>
<div class="highlight"><pre><code class="language-html" data-lang="html"><span class="nt">&lt;div</span> <span class="na">class=</span><span class="s">"show"</span><span class="nt">&gt;</span>...<span class="nt">&lt;/div&gt;</span>
<span class="nt">&lt;div</span> <span class="na">class=</span><span class="s">"hidden"</span><span class="nt">&gt;</span>...<span class="nt">&lt;/div&gt;</span></code></pre></div>
<div class="highlight"><pre><code class="language-scss" data-lang="scss"><span class="c1">// Classes
</span><span class="nc">.show</span> <span class="p"></span>
  <span class="nl">display</span><span class="p">:</span> <span class="nb">block</span> <span class="o">!</span><span class="n">important</span><span class="p"></span>
<span class="p"></span>
<span class="nc">.hidden</span> <span class="p"></span>
  <span class="nl">display</span><span class="p">:</span> <span class="nb">none</span> <span class="o">!</span><span class="n">important</span><span class="p"></span>
<span class="p"></span>
<span class="nc">.invisible</span> <span class="p"></span>
  <span class="nl">visibility</span><span class="p">:</span> <span class="nb">hidden</span><span class="p"></span>
</code></pre>
</div>

## Text
<h3 id="truncating-text">Truncating text</h3>
  <p>Easily truncate text with an ellipsis with a single mixin. <strong>Requires element to be <code>block</code> or <code>inline-block</code> level.</strong></p>
<div class="highlight"><pre><code class="language-scss" data-lang="scss"><span class="c1">// Mixin
</span><span class="nc">text-overflow</span><span class="o">()</span>
  <span class="nl">overflow</span><span class="p">:</span> <span class="nb">hidden</span><span class="p">;</span>
  <span class="nl">text-overflow</span><span class="p">:</span> <span class="n">ellipsis</span><span class="p"></span>
  <span class="nl">white-space</span><span class="p">:</span> <span class="nb">nowrap</span><span class="p"></span>
<span class="p"></span>

<span class="c1">// Usage
</span><span class="nc">.branch-name</span> <span class="p"></span>
  <span class="nl">display</span><span class="p">:</span> <span class="n">inline-block</span><span class="p"></span>
  <span class="nl">max-width</span><span class="p">:</span> <span class="m">200px</span><span class="p"></span>
  <span class="nc">text-overflow</span><span class="o">()</span><span class="p"></span>
<span class="p"></span></code></pre></div>

<h3 id="placeholder-color">Placeholder color</h3>
  <p>Provide context for form controls within each field.</p>
<div class="highlight"><pre><code class="language-scss" data-lang="scss">placeholder($color = $input-color-placeholder)
  &::-moz-placeholder // Firefox
    color $color
    opacity 1 // Override Firefox's unusual default opacity; See https//github.com/twbs/bootstrap/pull/11526
  &:-ms-input-placeholder // Internet Explorer 10+
    color $color
  &::-webkit-input-placeholder // Safari and Chrome
    color $color
</code></pre></div>

## Responsive
<div class="bs-docs-section">
  <p class="alert alert-danger">Only Classes</p>
  <p>Use a single or combination of the available classes for toggling content across viewport breakpoints.</p>
  <div class="table-responsive">
    <table class="table table-bordered table-striped responsive-utilities">
      <thead>
        <tr>
          <th></th>
          <th>
            Extra small devices
            <small>Phones (&lt;768px)</small>
          </th>
          <th>
            Small devices
            <small>Tablets (&ge;768px)</small>
          </th>
          <th>
            Medium devices
            <small>Desktops (&ge;992px)</small>
          </th>
          <th>
            Large devices
            <small>Desktops (&ge;1200px)</small>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row"><code>.visible-xs-*</code></th>
          <td class="is-visible">Visible</td>
          <td class="is-hidden">Hidden</td>
          <td class="is-hidden">Hidden</td>
          <td class="is-hidden">Hidden</td>
        </tr>
        <tr>
          <th scope="row"><code>.visible-sm-*</code></th>
          <td class="is-hidden">Hidden</td>
          <td class="is-visible">Visible</td>
          <td class="is-hidden">Hidden</td>
          <td class="is-hidden">Hidden</td>
        </tr>
        <tr>
          <th scope="row"><code>.visible-md-*</code></th>
          <td class="is-hidden">Hidden</td>
          <td class="is-hidden">Hidden</td>
          <td class="is-visible">Visible</td>
          <td class="is-hidden">Hidden</td>
        </tr>
        <tr>
          <th scope="row"><code>.visible-lg-*</code></th>
          <td class="is-hidden">Hidden</td>
          <td class="is-hidden">Hidden</td>
          <td class="is-hidden">Hidden</td>
          <td class="is-visible">Visible</td>
        </tr>
      </tbody>
      <tbody>
        <tr>
          <th scope="row"><code>.hidden-xs</code></th>
          <td class="is-hidden">Hidden</td>
          <td class="is-visible">Visible</td>
          <td class="is-visible">Visible</td>
          <td class="is-visible">Visible</td>
        </tr>
        <tr>
          <th scope="row"><code>.hidden-sm</code></th>
          <td class="is-visible">Visible</td>
          <td class="is-hidden">Hidden</td>
          <td class="is-visible">Visible</td>
          <td class="is-visible">Visible</td>
        </tr>
        <tr>
          <th scope="row"><code>.hidden-md</code></th>
          <td class="is-visible">Visible</td>
          <td class="is-visible">Visible</td>
          <td class="is-hidden">Hidden</td>
          <td class="is-visible">Visible</td>
        </tr>
        <tr>
          <th scope="row"><code>.hidden-lg</code></th>
          <td class="is-visible">Visible</td>
          <td class="is-visible">Visible</td>
          <td class="is-visible">Visible</td>
          <td class="is-hidden">Hidden</td>
        </tr>
      </tbody>
    </table>
  </div>

  <p>So, for extra small (<code>xs</code>) screens for example, the available <code>.visible-*-*</code> classes are: <code>.visible-xs-block</code>, <code>.visible-xs-inline</code>, and <code>.visible-xs-inline-block</code>.</p>
</div>

## Miscs
 <h3 id="miscs-colors">Contextual colors</h3>
  <p>Convey meaning through color with a handful of emphasis utility classes. These may also be applied to links and will darken on hover just like our default link styles.</p>
  <div class="bs-example" data-example-id="contextual-colors-helpers">
    <p class="text-muted">Fusce dapibus, tellus ac cursus commodo, tortor mauris nibh.</p>
    <p class="text-primary">Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
    <p class="text-success">Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
    <p class="text-info">Maecenas sed diam eget risus varius blandit sit amet non magna.</p>
    <p class="text-warning">Etiam porta sem malesuada magna mollis euismod.</p>
    <p class="text-danger">Donec ullamcorper nulla non metus auctor fringilla.</p>
  </div>
<div class="highlight"><pre><code class="language-html" data-lang="html"><span class="nt">&lt;p</span> <span class="na">class=</span><span class="s">"text-muted"</span><span class="nt">&gt;</span>...<span class="nt">&lt;/p&gt;</span>
<span class="nt">&lt;p</span> <span class="na">class=</span><span class="s">"text-primary"</span><span class="nt">&gt;</span>...<span class="nt">&lt;/p&gt;</span>
<span class="nt">&lt;p</span> <span class="na">class=</span><span class="s">"text-success"</span><span class="nt">&gt;</span>...<span class="nt">&lt;/p&gt;</span>
<span class="nt">&lt;p</span> <span class="na">class=</span><span class="s">"text-info"</span><span class="nt">&gt;</span>...<span class="nt">&lt;/p&gt;</span>
<span class="nt">&lt;p</span> <span class="na">class=</span><span class="s">"text-warning"</span><span class="nt">&gt;</span>...<span class="nt">&lt;/p&gt;</span>
<span class="nt">&lt;p</span> <span class="na">class=</span><span class="s">"text-danger"</span><span class="nt">&gt;</span>...<span class="nt">&lt;/p&gt;</span></code></pre></div>
  <div class="bs-callout bs-callout-info" id="callout-helper-context-color-specificity">
    <h4>Dealing with specificity</h4>
    <p>Sometimes emphasis classes cannot be applied due to the specificity of another selector. In most cases, a sufficient workaround is to wrap your text in a <code>&lt;span&gt;</code> with the class.</p>
  </div>
  <h3 id="miscs-backgrounds">Contextual backgrounds</h3>
  <p>Similar to the contextual text color classes, easily set the background of an element to any contextual class. Anchor components will darken on hover, just like the text classes.</p>
  <div class="bs-example bs-example-bg-classes" data-example-id="contextual-backgrounds-helpers">
    <p class="bg-primary">Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
    <p class="bg-success">Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
    <p class="bg-info">Maecenas sed diam eget risus varius blandit sit amet non magna.</p>
    <p class="bg-warning">Etiam porta sem malesuada magna mollis euismod.</p>
    <p class="bg-danger">Donec ullamcorper nulla non metus auctor fringilla.</p>
  </div>
<div class="highlight"><pre><code class="language-html" data-lang="html"><span class="nt">&lt;p</span> <span class="na">class=</span><span class="s">"bg-primary"</span><span class="nt">&gt;</span>...<span class="nt">&lt;/p&gt;</span>
<span class="nt">&lt;p</span> <span class="na">class=</span><span class="s">"bg-success"</span><span class="nt">&gt;</span>...<span class="nt">&lt;/p&gt;</span>
<span class="nt">&lt;p</span> <span class="na">class=</span><span class="s">"bg-info"</span><span class="nt">&gt;</span>...<span class="nt">&lt;/p&gt;</span>
<span class="nt">&lt;p</span> <span class="na">class=</span><span class="s">"bg-warning"</span><span class="nt">&gt;</span>...<span class="nt">&lt;/p&gt;</span>
<span class="nt">&lt;p</span> <span class="na">class=</span><span class="s">"bg-danger"</span><span class="nt">&gt;</span>...<span class="nt">&lt;/p&gt;</span></code></pre></div>
  <div class="bs-callout bs-callout-info" id="callout-helper-bg-specificity">
    <h4>Dealing with specificity</h4>
    <p>Sometimes contextual background classes cannot be applied due to the specificity of another selector. In some cases, a sufficient workaround is to wrap your element's content in a <code>&lt;div&gt;</code> with the class.</p>
  </div>
  <h3 id="miscs-carets">Carets</h3>
  <p>Use carets to indicate dropdown functionality and direction. Note that the default caret will reverse automatically in <a href="../generics/#btn-dropdowns-dropup">dropup menus</a>.</p>
  <div class="bs-example" data-example-id="caret">
    <span class="caret"></span>
  </div>
<div class="highlight"><pre><code class="language-html" data-lang="html"><span class="nt">&lt;span</span> <span class="na">class=</span><span class="s">"caret"</span><span class="nt">&gt;&lt;/span&gt;</span></code></pre></div>

 <h3 id="miscs-retina-images">Retina images</h3>
  <p>Specify two image paths and the @1x image dimensions, and Bootstrap will provide an @2x media query. <strong>If you have many images to serve, consider writing your retina image CSS manually in a single media query.</strong></p>
<div class="highlight"><pre><code class="language-scss" data-lang="scss">img-retina($file-1x, $file-2x, $width-1x, $height-1x)
  background-image url("{$file-1x}")

  @media
  //only screen and (-webkit-min-device-pixel-ratio 2),
  //only screen and (min--moz-device-pixel-ratio 2),
  //only screen and (-o-min-device-pixel-ratio 2/1),
  only screen and (min-device-pixel-ratio 2),
  only screen and (min-resolution 192dpi),
  only screen and (min-resolution 2dppx)
    background-image url("{$file-2x}")
    background-size $width-1x $height-1x

<span class="c1">// Usage
</span><span class="nc">.jumbotron</span> <span class="p"></span>
  <span class="nc">img-retina</span><span class="o">(</span><span class="s2">"/img/bg-1x.png"</span><span class="o">,</span> <span class="s2">"/img/bg-2x.png"</span><span class="o">,</span> <span class="nt">100px</span><span class="o">,</span> <span class="nt">100px</span><span class="o">)</span><span class="p"></span>
<span class="p"></span></code></pre></div>
