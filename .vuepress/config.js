module.exports = {
    title: 'JDev',
    description: 'A Blog Static Site',
    head: [
        ['link', {rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.1/css/bulma.min.css'}]
    ],
    themeConfig: {
        sidebar: [
            {
                title: 'Blog',
                collapsable: false,
                path: '/blogs',
                children: [
                    '/blogs/blog01',
                    '/blogs/blog02',
                    '/blogs/blog03',
                    '/blogs/blog04'
                ]
            }
        ],
        nav: [
            {text: 'Medium', link: 'https://medium.com/@infinityc222'}
        ],
        repo: 'infinityc2/vuepress-site-blog',
        repoLabel: 'Contribute!'
    },
    markdown: {
        config: md => {
            md.use(require("markdown-it-anchor")),
            md.use(require("markdown-it-table-of-contents"))
        }
    }
}