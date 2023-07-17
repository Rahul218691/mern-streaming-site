import { dateFormat } from "utils"

export const getColumnConfig = () => [
    {
        key: '_id',
        title: 'Artist Id'
    },
    {
        key: 'artistName',
        title: 'Name'
    },
    {
        key: 'artistImage',
        title: 'Image',
        render: (_, { artistImage }) => (
            <img src={artistImage} alt='' />
        )
    },
    {
        key: "createdAt",
        title: "Created On",
        render: (_, { createdAt }) => (
            <p>{dateFormat(createdAt)}</p>
        )
    }
    // {
    //     title: 'Actions',
    //     cell: (_, data) => <RowActions data={data} actionsConfig={ROW_ACTIONS} onSelect={onSelectActionType} />
    // }
]