import type {
  InsertPersonSchema,
  MyUseMutationOptions,
  MyUseQueryOptions,
  NewPerson,
  Person,
  UpdateTable,
  WithId,
} from '@rooots/db/schema/types'
import type { SQLiteRunResult } from 'expo-sqlite'

import {
  createPerson,
  getPeople,
  getPersonById,
  deletePerson,
  updatePerson,
  updatePersonName,
} from '@rooots/queries'
import { useMutation, useQuery, type QueryClient } from '@tanstack/react-query'
import { getDeviceId } from '../../utils/device'

const all = ['people', 'all'] as const
const byId = ['people', 'byId'] as const
const create = ['people', 'create'] as const

export const personRouter = {
  // READ
  all: {
    useQuery: (options?: MyUseQueryOptions<Person[]>) =>
      useQuery({ ...options, queryKey: all, queryFn: getPeople }),
  },

  byId: {
    useQuery: ({ id, ...options }: WithId & MyUseQueryOptions<Person | undefined>) =>
      useQuery({
        ...options,
        queryKey: [...byId, id],
        queryFn: () => getPersonById(id),
      }),
  },

  // CREATE
  create: {
    useMutation: (options?: MyUseMutationOptions<Person[], InsertPersonSchema>) =>
      useMutation({
        ...options,
        mutationKey: create,
        mutationFn: async (input) =>
          createPerson({ ...input, createdByUserId: await getDeviceId() }),
      }),
  },

  // DELETE
  delete: {
    useMutation: (options?: MyUseMutationOptions<SQLiteRunResult, WithId>) => {
      return useMutation({
        ...options,
        mutationKey: ['people', 'delete'],
        mutationFn: deletePerson,
      })
    },
  },

  // UPDATE
  update: {
    useMutation: (options?: MyUseMutationOptions<SQLiteRunResult, UpdateTable<NewPerson>>) => {
      return useMutation({
        ...options,
        mutationKey: ['people', 'update'],
        mutationFn: updatePerson,
      })
    },
  },

  updateName: {
    useMutation: (
      options?: MyUseMutationOptions<
        SQLiteRunResult,
        { firstName: string; lastName?: string } & WithId
      >,
    ) => {
      return useMutation({
        ...options,
        mutationKey: ['people', 'updateName'],
        mutationFn: updatePersonName,
      })
    },
  },
}

export const personInvalidators = (queryClient: QueryClient) => ({
  all: {
    invalidate: async () => {
      await queryClient.invalidateQueries({ queryKey: all })
    },
  },
  byId: {
    invalidate: async ({ id }: WithId) => {
      await queryClient.invalidateQueries({ queryKey: [...byId, id] })
    },
  },
})
