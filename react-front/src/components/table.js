import React from 'react'
import Plot from 'react-plotly.js'

export default function Table(props){

    const values = [
        props.categories,
        props.confidence]

    return (
        <Plot
        data={[{
            type: 'table',
            header: {
              values: [["Category"], ["Confidence"]]
            },
            cells: {
              values: values,
              align: "center"
            }
            }
          ]}
        layout={ {width: 750, height: 750} }
      />
    )
}