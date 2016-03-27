/*!
 * JavaScript for Bootstrap's docs (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under the Creative Commons Attribution 3.0 Unported License. For
 * details, see https://creativecommons.org/licenses/by/3.0/.
 */

!function ($) {
  'use strict';

  $(function () {

    var $window  = $(window)
    var $sidebar = $('.site-sidebar')
    var $content = $('.site-content')

    $sidebar.scrollTop($sidebar.find('.is-active')[0].offsetTop - 32)

    $content.scrollspy({
      target: '.site-sidebar'
    })
    $window.on('load', function () {
      $content.scrollspy('refresh')
    })

    // Tooltip and popover demos
    $('.tooltip-demo').tooltip({
      selector: '[data-toggle="tooltip"]',
      container: 'body'
    })
    $('.popover-demo').popover({
      selector: '[data-toggle="popover"]',
      container: 'body'
    })

    // Demos within modals
    $('.tooltip-test').tooltip()
    $('.popover-test').popover()

    // Popover demos
    $('.bs-docs-popover').popover()

    // Button state demo
    $('#loading-example-btn').on('click', function () {
      var $btn = $(this)
      $btn.button('loading')
      setTimeout(function () {
        $btn.button('reset')
      }, 3000)
    })

    // Modal relatedTarget demo
    $('#exampleModal').on('show.bs.modal', function (event) {
      var $button = $(event.relatedTarget)      // Button that triggered the modal
      var recipient = $button.data('whatever')  // Extract info from data-* attributes
      // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
      // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
      var $modal = $(this)
      $modal.find('.modal-title').text('New message to ' + recipient)
      $modal.find('.modal-body input').val(recipient)
    })

    // Activate animated progress bar
    $('.bs-docs-activate-animated-progressbar').on('click', function () {
      $(this).siblings('.progress').find('.progress-bar-striped').toggleClass('active')
    })

    // Insert copy to clipboard button before .highlight
    $('.highlight').each(function () {
      var btnHtml = '<div class="zero-clipboard"><span class="btn-clipboard">Copy</span></div>'
      $(this).before(btnHtml)
    })

    var createNotification = function(text) {
      var content = "Copied: Code"
      var notification = new Notification(content)
      setTimeout(function() {
        notification.close()
      }, 1000)
    }

    var clipboard = new Clipboard('.btn-clipboard', {
      text: function(trigger) {
        var highlight = $(trigger).parent().nextAll('.highlight').first()
        var text = highlight.text()
        return text
      }
    })
    clipboard.on('success', function(e) {
        var text = e.text
        if (Notification.persmission === 'granted') {
          createNotification(text)
        } else if (Notification.permission !== 'denied') {
          Notification.requestPermission(function (permission) {
            if (permission === "granted") {
              createNotification(text)
            }
          })
        }
    })

  })

  anchors.options.icon = '¶'
  setTimeout(function(){
    anchors.add('.site-content h1, .site-content h2')
  })

}(jQuery)
