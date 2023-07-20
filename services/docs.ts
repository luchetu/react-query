import { createApi } from '@reduxjs/toolkit/query/react'
import { gql } from 'graphql-request'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'
import { Docs, DocResponse, GetDocsResponse } from "../types/index";

const api = createApi({
    baseQuery: graphqlRequestBaseQuery({
        url: '/graphql'
    }),
    endpoints: (builder) => ({
        getDocs: builder.query<GetDocsResponse, { page?: number; per_page?: number }>
            ({
                query: ({ page, per_page }) => ({
                    document: gql`
                  query GetDocs($page: Int = 1, $per_page: Int = 10) {
                    docs(page: $page, per_page: $per_page) {
                        title,
                         meta,
                         documents
                    }
                  }
                `,
                    variables: {
                        page,
                        per_page,
                    },
                }),
            }),
        getDoc: builder.query<Docs, string>({
            query: (id) => ({
                document: gql`
              query GetDoc($id: ID!) {
                case(id: ${id}) {
                    caseNumber,
                    caseTitle,
                    caseType,
                    partiesInvolved,
                    caseStatus,
                    deadlines,
                    caseDescription,
                    caseNotes,
                    status
                }
              }
              `,
            }),
            transformResponse: (response: DocResponse) => response.data.doc,

        }),
        createDoc: builder.mutation<Docs, Partial<Docs>>
            ({
                query: (newDoc) => ({
                    document: gql`
          mutation CreateDoc($newDoc: DocInput!) {
            createDoc(input: $newDoc) {
              caseNumber
              caseTitle
              caseType
              partiesInvolved
              caseStatus
              deadlines
              caseDescription
              caseNotes
              status
            }
          }
        `,
                    variables: {
                        newDoc,
                    },
                })
            }),

    })
})

export const { useGetDocQuery, useGetDocsQuery, useCreateDocMutation } = api