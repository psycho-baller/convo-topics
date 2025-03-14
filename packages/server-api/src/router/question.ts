import { z } from 'zod'
import { insertQuestionSchema } from '@rooots/db/schema/types'

import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc'
import {
  assignQuestionToGroup,
  assignQuestionToPerson,
  createQuestion,
  deleteQuestion,
  getQuestionById,
  getQuestions,
  getQuestionsForGroup,
  getQuestionsForPerson,
  updateQuestion,
} from '@rooots/queries'

export const questionRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => getQuestions()),

  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => getQuestionById(input.id)),

  getQuestionsForGroup: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => getQuestionsForGroup(input.id)),

  create: protectedProcedure
    .input(insertQuestionSchema)
    .mutation(async ({ ctx, input }) =>
      createQuestion({ ...input, createdByUserId: ctx.session.user.id }),
    ),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ ctx, input }) => deleteQuestion(input)),

  getQuestionsForPerson: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => getQuestionsForPerson(input.id)),

  update: protectedProcedure
    .input(z.intersection(z.optional(insertQuestionSchema), z.object({ id: z.number() })))
    .mutation(({ ctx, input }) => updateQuestion(input)),

  updateText: protectedProcedure
    .input(z.object({ id: z.number(), question: z.string() }))
    .mutation(({ ctx, input }) => updateQuestion(input)),

  assignToPerson: protectedProcedure
    .input(z.object({ questionId: z.number(), personId: z.number() }))
    .mutation(({ ctx, input }) => assignQuestionToPerson(input)),

  assignToGroup: protectedProcedure
    .input(z.object({ questionId: z.number(), groupId: z.number() }))
    .mutation(({ ctx, input }) => assignQuestionToGroup(input)),
})
