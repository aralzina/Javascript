const changelog = [
  /* Placeholder for next change
    {
        date: '',
        changes: [
            {
                section: '',
                comments: [
                    '',
                ]
            }
        ]
    },
    */
  {
    date: '6/21/2024',
    changes: [
      {
        section: 'Menu',
        comments: ['Added in a help section.']
      },
      {
        section: 'Back-End',
        comments: [
          'Offset the factory indicator queries to run after the COS Dashboard query. This allows for a faster load. When the factory indicators is being built, the report will not respond.'
        ]
      }
    ]
  },
  {
    date: '6/20/2024',
    changes: [
      {
        section: 'Custom Links',
        comments: [
          'Added default links',
          'Added help text at the bottom of the custom links section',
          'Added dynamic formatting to optimize how many categories appear in each row'
        ]
      },
      {
        section: 'Back-End',
        comments: [
          'Added export/import settings options for when the dashboard is setup to save configs'
        ]
      }
    ]
  },
  {
    date: '6/18/2024',
    changes: [
      {
        section: 'Main Page',
        comments: [
          'Added the "Custom Links" tab - this will only save to your current browser. Config saving will be implemented in the future.'
        ]
      },
      {
        section: 'Theme',
        comments: [
          'Reimagined the entire theme',
          'Moved the menu above the filters',
          'Pulled the COS dashboard table out of the table that it was nested inside'
        ]
      },
      {
        section: 'Menu',
        comments: [
          'Added a settings option',
          'Added custom link settings to the settings menu'
        ]
      }
    ]
  },
  {
    date: '6/13/2024',
    changes: [
      {
        section: 'Menu',
        comments: [
          'Replaced old menu with a nested menu.',
          'Added Changelog to the menu'
        ]
      },
      {
        section: 'Main Content Section',
        comments: [
          'Separated the content into separate clickable tabs. COS Dashboard will be the default.'
        ]
      }
    ]
  }
]

function showChangelog () {
  let div, hdr, mainSection, section, content, ul
  div = create('div')
  mainSection = create('section')

  appendChildren(div, [
    create(
      'h1',
      { textContent: 'Changelog' },
      {
        style:
          'padding-bottom: 8px; border-bottom: solid black 1px; text-align: center;'
      }
    ),
    mainSection
  ])

  cl = sortBy(changelog, 'date', false)
  cl.forEach(change => {
    section = create('section')
    hdr = create('h2', { textContent: change['date'] })
    ul = create('ul')
    content = ''
    change['changes'].forEach(comment => {
      content = `<li><b>${comment['section']}</b><ul>`
      comment['comments'].forEach(item => {
        content = content + `<li>${item}</li>`
      })
      content = content + '</ul></li>'
      ul.innerHTML = ul.innerHTML + content
    })
    appendChildren(section, [hdr, ul])
    mainSection.appendChild(section)
  })
  makeModal(div)
}

const HELP = [
  {
    section: 'COS Dashboard',
    comments: [
      'The COS dashboard will not show any data until filters are selected and applied.'
    ]
  },
  {
    section: 'Factory Indicators',
    comments: [
      "Factory indicators currently contain nested tables of information. Click a cell value and another table will pop out.You can continue to drill down this way until clicking a cell no longer brings a new table forward. This section queries it's data after the COS Dashboard data and will cause a temporary unresponsive state for the whole report.",
      'This section is the biggest reason for the long load time. When I started this project, I wanted all information possible to be available to anyone that needed it.I have come up with a better strategy for a future update.The report will only show data relative to the person viewing the report and the filters applied.'
    ]
  },
  {
    section: 'Links',
    comments: [
      'Links can be configured in the settings menu. If none are configured, the defaults will be loaded. You can add to the defaults, change them, or remove them altogether. If you delete all defaults, make sure to add at least one link before closing the settings menu, otherwise the defaults will show up again.'
    ]
  }
]

function showHelp () {
  function makeLi (data) {
    let li, span, p

    // create li
    li = create('li')

    // create span
    span = create(
      'span',
      { textContent: data.section },
      { style: 'font-weight: bolder; text-decoration: underline;' }
    )

    // attach span to li
    li.append(span)

    // loop paragraphs
    data.comments.forEach(comment => {
      // create paragraph
      p = create('p', { textContent: comment })

      // append to li
      li.append(p)
    })

    return li
  }

  let div, hdr, section, ul

  // make parent div
  div = create('div')

  // make div children
  hdr = create(
    'h1',
    { textContent: 'Help' },
    { style: 'text-align:center;border-bottom: solid black;' }
  )
  section = create('section')

  // append to div
  appendChildren(div, [hdr, section])

  // make ul
  ul = create('ul')

  // append to section
  section.append(ul)

  HELP.forEach(item => {
    ul.append(makeLi(item))
  })

  makeModal(div)
}
