import { dateFormat } from "utils"
import RowActions from "./RowActions"

export const getColumnConfig = ({
    isSecureDomain,
    selected,
    isPlaying,
    onPause = () => { },
    onPlaySelected = () => { }
}) => [
    {
        key: 'title',
        title: 'Title',
        render: (_, { id, title }) => (
            <p>{`${id}. ${title}`}</p>
        )
    },
    {
        key: "podcastPublishDate",
        title: "Published On",
        render: (_, { podcastPublishDate }) => (
            <p>{dateFormat(podcastPublishDate)}</p>
        )
    },
    {
        title: '',
        cell: (_, data) => <RowActions 
        data={data}
        isSecureDomain={isSecureDomain}
        selected={selected}
        isPlaying={isPlaying}
        onPause={onPause}
        onPlaySelected={onPlaySelected}
        />
    }
]