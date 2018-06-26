// Check API component

function ApiCheck (el) {
  var form = el.querySelector('[data-api-check-form]')
  var button = el.querySelector('button')
  var input = el.querySelector('input[type=text]')

  button.addEventListener('click', handleSubmit)

  function handleSubmit (e) {
    e.preventDefault()
    var option = form.querySelector('input[type=radio]:checked')
    if (option && input.value) {
      fetchApi(option.value, input.value)
    }
  }

  function handleClose (e) {
    e.preventDefault()
    removeResponse()
  }

  function showResponse (msg, status) {
    removeResponse()
    var pre = document.createElement('pre')
    var closeLink = document.createElement('a')
    pre.classList.add('api-check__pre')
    pre.classList.add(status)
    closeLink.setAttribute('href', '#')
    closeLink.classList.add('api-check__close')
    closeLink.innerText = 'Close'
    el.appendChild(pre).innerHTML = syntaxHighlight(msg)
    pre.appendChild(closeLink)
    closeLink.addEventListener('click', handleClose)
  }
  
  function removeResponse () {
    var previousPre = el.querySelector('pre')
    if (previousPre) previousPre.remove()
  }

  function fetchApi (type, name, cb) {
    var req = new XMLHttpRequest()
    req.open('GET', 'https://wptide.org/api/tide/v1/audit/wporg/'+ type +'/'+ name, true)
    req.onreadystatechange = function () {
      if (req.readyState == 4) {
        if(req.status == 200) showResponse(JSON.parse(req.responseText), 'success')
        else showResponse('The '+type+' you\'re looking for does not exist in our database. Make sure you entered a right name or try to search for something else.', 'error')
      }
    }
    req.send(null)
  }

  function syntaxHighlight(json) {
    if (typeof json != 'string') {
      json = JSON.stringify(json, undefined, 2);
    }

    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
      var cls = 'hljs-number';
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = 'hljs-attr';
        } else {
          cls = 'pl-s';
        }
      } else if (/true|false/.test(match)) {
        cls = 'pl-c1';
      } else if (/null/.test(match)) {
        cls = 'pl-c1';
      }
      return '<span class="' + cls + '">' + match + '</span>';
    });
  }
}

module.exports = ApiCheck