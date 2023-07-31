import { dateFormat } from "utils"

export const getColumnConfig = () => [
    {
        key: 'title',
        title: 'Title'
    },
    {
        key: "podcastPublishDate",
        title: "Published On",
        render: (_, { podcastPublishDate }) => (
            <p>{dateFormat(podcastPublishDate)}</p>
        )
    }
]