const React = require('react')
const Default = require('./layouts/Default')

function Index ({ breads, title }) {
    return (
      <Default title={title}>
        <h2>Index Page</h2>
        {/* <p>I have {breads[0].name} bread!</p> */}
        <ul>
            {
                breads.map( (bread) => {
                    // console.log(bread)
                    return (
                        <li key={bread._id}>
                        <a href={`/breads/${bread._id}`}>{bread.name}</a>
                    </li>
                    )
                })

            }
        </ul>

        <div className="newButton">
            <a href="/breads/new"><button>Add a new bread</button></a>
        </div>

      </Default>
    )
}

module.exports = Index
