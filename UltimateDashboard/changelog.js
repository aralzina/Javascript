// Template - copy everything from line 4 - 14 and paste it in //
/*

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
    }
    

*/

const changelog = [
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
  },

  {
    date: '6/17/2024',
    changes: [
      {
        section: 'Theme',
        comments: [
          'Reimagined the entire theme',
          'Moved the menu above the filters',
          'Pulled the COS dashboard table out of the table that it was nested inside'
        ]
      }
    ]
  }

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
    }
    */
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
