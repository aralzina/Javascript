const changelog = [
  /* template - copy from open curly brace to the comma after the closing curly
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
    date: '1/3/2025',
    changes: [
      {
        section: 'Filters',
        comments: [
          'Adjusted code so that the filters are created dynamically based on the provided data.',
          'If the COS Dash does not work, import your settings file or clear browser cache and reload.'
        ]
      }
    ]
  },
  {
    date: '1/2/2025',
    changes: [
      {
        section: 'Filters',
        comments: ['Added 1227 to filters']
      }
    ]
  },
  {
    date: '11/1/2024',
    changes: [
      {
        section: 'Filters',
        comments: ['Removed 1270 from filters', 'Added 5053 to filters']
      }
    ]
  },
  {
    date: '8/13/2024',
    changes: [
      {
        section: 'URL Parameters',
        comments: [
          'URL parameters can now be used to pass filters into the report. The format must at least include process and ceid and multiple values can be entered as long as they are separated by a comma',
          'Here is an example of adding parameters to the end of this url: &process=1270,1274&ceid=ESTwa,NSTwn'
        ]
      }
    ]
  },
  {
    date: '8/8/2024',
    changes: [
      {
        section: 'Settings',
        comments: [
          'Added Collective Passdown to the links page. This will automatically build the link and include all entities in the Ceids that you selected in filters.',
          'Added a page settings tab. This will be for general page settings.',
          "An autorefresh option is now available in settings. If this page isn't active at the time the refresh is supposed to trigger, it will delay until you click back into this tab. This will prevent refreshes when the page isn't being viewed."
        ]
      }
    ]
  },
  {
    date: '7/23/2024',
    changes: [
      {
        section: 'Settings',
        comments: [
          'Added in options to import and export settings as a json file. Use this to backup your settings until I configure each users settings to backup to the database. You can also share your settings with other people.'
        ]
      },
      {
        section: 'Custom Links',
        comments: [
          'Any link that directs to a power BI report on the same server as this report will automatically open in the internal modal window.'
        ]
      }
    ]
  },
  {
    date: '7/12/2024',
    changes: [
      {
        section: 'COS Dash',
        comments: [
          'Added in historical availability data for current work week, 7 ww average, and 13 ww average.'
        ]
      }
    ]
  },
  {
    date: '7/5/2024',
    changes: [
      {
        section: 'Indicators',
        comments: ['PQGC quarterly indicator added to indicators tab.']
      }
    ]
  },
  {
    date: '7/3/2024',
    changes: [
      {
        section: 'Indicators',
        comments: [
          'Removed entire factory data and rebuilt indicators to reflect only data that matters to the user.',
          "A future update will allow the user to view the report as someone else so that one could view another manager's indicators easily."
        ]
      },
      {
        section: 'Link Settings',
        comments: ['Fixed a bug that created borders on the link types.']
      }
    ]
  },
  {
    date: '6/28/2024',
    changes: [
      {
        section: 'Settings',
        comments: ['Added a user info window']
      },
      {
        section: 'UI',
        comments: [
          'Fixed an issue where the filter section would collapse if the window size was too small.'
        ]
      }
    ]
  },
  {
    date: '6/24/2024',
    changes: [
      {
        section: 'Settings',
        comments: ['Rebuilt the custom link settings page']
      }
    ]
  },
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
      },
      {
        section: 'COS Dashboard',
        comments: ['Fixed ILM links not opening in a new window.']
      },
      {
        section: 'Help',
        comments: [
          'Added section about filters only applying to DOTS/COS Dashboard',
          'Added info on fixing the filters not allowing you to add more filters if they were already set'
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
  mainSection = create('div', {
    style: `max-height: ${window.innerHeight * 0.7}px; overflow-y: auto;`
  })

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
      'The COS dashboard will not show any data until filters are selected and applied.',
      'Alternatively, users can now pass in parameters by adding them to the end of the URL. Here is an example:  &process=1270,1274&area=WetEtch&ceid=ESTwa,NSTwn,GSTwa',
      '&process=... and &ceid=... MUST both be used, area is optional. Users can add multiple values separated by commas. At this time, passing in URL parameters will overwrite the current config. If you want to keep your settings, make sure to go into Menu > Settings > Export'
    ]
  },
  {
    section: 'Indicators',
    comments: [
      //"The category name of each indicator also serves as a button to show graph data for that indicator. You'll see the button change color when you hover over it.",
      // "Factory indicators currently contain nested tables of information. Click a cell value and another table will pop out.You can continue to drill down this way until clicking a cell no longer brings a new table forward. This section queries it's data after the COS Dashboard data and will cause a temporary unresponsive state for the whole report.",
      // 'This section is the biggest reason for the long load time. When I started this project, I wanted all information possible to be available to anyone that needed it.I have come up with a better strategy for a future update.The report will only show data relative to the person viewing the report and the filters applied.'
      'Reworked this entire section to only include data relevant to the user. This will dramatically reduce load times and reduce clicking needed to drill-down to useful information.',
      'Currently only works for technicians and their GLs. AM/DM support coming soon.'
    ]
  },
  {
    section: 'Links',
    comments: [
      'Links can be configured in the settings menu. If none are configured, the defaults will be loaded. You can add to the defaults, change them, or remove them altogether. If you delete all defaults, make sure to add at least one link before closing the settings menu, otherwise the defaults will show up again.'
    ]
  },
  {
    section: 'Filters',
    comments: [
      'Filters currently only apply to the COS Dashboard and the DOTS link',
      "After refreshing the page, the ceids won't show other ceids that should show with the current filters. In order to fix this, add a process and then remove the process. All ceids should show if they apply to the process/functional area"
    ]
  },
  {
    section: 'Menu',
    comments: [
      'Settings has tabs to import/export settings. Use the Custom Links tab to configure links.'
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
