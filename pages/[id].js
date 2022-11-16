import prisma from 'lib/prisma'
import { getItem } from 'lib/data.js'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Item({ item }) {
  const [rating, setRating] = useState(5)
  const [description, setDescription] = useState('')
  const router = useRouter()

  return (
    <div className='text-center'>
      <h1 className='mt-10 font-extrabold text-2xl'>{item.name}</h1>
      <h2 className='mt-10 font-bold'>{item.description}</h2>
      {item.rating !== 0 && (
        <h2 className='mt-10 font-bold'>
          Rating: {item.rating / 10} / 5{' '}
          {[...Array(Math.round(item.rating / 10))].map(() => '⭐️ ')}
        </h2>
      )}

      {item.reviews.length > 0 && (
        <div>
          <h2 className='mt-10 mb-5 font-extrabold text-lg'>Reviews</h2>

          {item.reviews.map((review) => (
            <div className='mb-3' key={index}>
              <p>{[...Array(Math.round(review.rating))].map(() => '⭐️ ')}</p>
              <p>{review.description}</p>
            </div>
          ))}
        </div>
      )}

      <h2 className='mt-10 font-extrabold text-lg'>Add a new review</h2>

      <form
        className='mt-3'
        onSubmit={async (e) => {
          e.preventDefault()
          await fetch('/api/review', {
            body: JSON.stringify({
              rating,
              description,
              item: item.id,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          })

          router.reload()
        }}
      >
        <div className='flex-1 mb-5'>
          <div className='flex-1 mb-2'>Rating</div>

          <select
            className='border border-grey-600 mb-5 px-2 py-1'
            onChange={(e) => setRating(e.target.value)}
          >
            <option value='5'>5</option>
            <option value='4'>4</option>
            <option value='3'>3</option>
            <option value='2'>2</option>
            <option value='1'>1</option>
          </select>

          <div className='flex-1 mb-2'>Description</div>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            className='border p-1 text-black '
          />
        </div>

        <button className={`border px-8 py-2 mt-2 font-bold`}>Add item</button>
      </form>
    </div>
  )
}

export async function getServerSideProps({ params }) {
  const item = await getItem(prisma, parseInt(params.id))
  console.log(item)
  return {
    props: {
      item,
    },
  }
}