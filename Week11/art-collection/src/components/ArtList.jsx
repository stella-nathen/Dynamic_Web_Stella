import {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {removeArt, selectVisibleArt} from '../store'

/*
  I used local state for the sort order because this
  component is the only one that needs to know it.
  The sorted array isn't separate state, since I can
  work it out from the existing list whenever I need it.
*/

const ArtList = () => {
  const dispatch = useDispatch()
  const visible = useSelector(selectVisibleArt)
  const [highFirst, setHighFirst] = useState(false)

  const sortedArt = highFirst
    ? [...visible].sort((a, b) => b.price - a.price)
    : visible

  return (
    <section className="border-b-4 border-ink">
      <div className="border-b-4 border-ink p-4">
        <button
          onClick={() => setHighFirst(!highFirst)}
          className={`border-4 border-ink px-4 py-2 text-xs font-black uppercase ${
            highFirst ? 'bg-flat-yellow' : 'bg-paper'
          }`}
        >
          {highFirst ? 'Price: High to Low ✓' : 'Sort: Highest Price First'}
        </button>
      </div>

      {sortedArt.length === 0 ? (
        <p className="p-5 text-sm">Nothing to show.</p>
      ) : (
        <ul>
          {sortedArt.map((art) => (
            <li
              key={art.id}
              className="flex items-center justify-between gap-3 border-b-4 border-ink px-5 py-3 last:border-b-0"
            >
              <p className="text-sm font-black uppercase">
                {art.name}{' '}
                <span className="font-normal">${art.price}</span>
              </p>
              <button
                onClick={() => dispatch(removeArt(art.id))}
                className="border-4 border-ink bg-flat-red px-3 py-1 text-xs font-black uppercase text-paper"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default ArtList