import { Client, query } from 'faunadb'

import { FAUNA_SECRET } from './faunaKeys'

const deleteCollection = async (collection, documentId) => {
    const q = query
    const client = new Client({ secret: FAUNA_SECRET, })
    const collectionQuery = await client.query(
        q.Delete(q.Ref(q.Collection(collection), documentId))
      )
        .then(response => {
          console.log('Document deleted successfully:', response);
        })
        .catch(error => {
          console.error('Error deleting document:', error);
        });

    if (collectionQuery) return collectionQuery.data

}

export default deleteCollection