import { createApi } from '@reduxjs/toolkit/query/react'
import { gql } from 'graphql-request'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'
import { CaseContacts, GetContactsResponse } from "../types/index";

const api = createApi({
    baseQuery: graphqlRequestBaseQuery({
        url: '/graphql'
    }),
    endpoints: (builder) => ({

        getContacts: builder.query<GetContactsResponse, { page?: number; per_page?: number }>
            ({
                query: ({ page, per_page }) => ({
                    document: gql`
                  query GetContacts($page: Int = 1, $per_page: Int = 10) {
                    contacts(page: $page, per_page: $per_page) {
                    contactName,
                    contactPhoneNumber,
                    contactEmail
                    }
                  }
                `,
                    variables: {
                        page,
                        per_page,
                    },
                }),
            }),
        createContact: builder.mutation<CaseContacts, Partial<CaseContacts>>
            ({
                query: (newContact) => ({
                    document: gql`
          mutation CreateContact($newContact: ContactInput!) {
            createContact(input: $newContact) {
              contactName
              contactPhoneNumber
              contactEmail
              CaseID
            }
          }
        `,
                    variables: {
                        newContact,
                    },
                })
            })

    })
})

export const { useGetContactsQuery, useCreateContactMutation } = api
