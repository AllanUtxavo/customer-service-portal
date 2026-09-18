import { http, HttpResponse } from 'msw';

import { serviceRequests } from './data';

import type { CreateServiceRequest } from '../types/request';


export const handlers = [
  http.get(`*/requests`, ({ request }) => {
    const url = new URL(request.url);

    const search = url.searchParams.get('search')?.toLowerCase();
    const status = url.searchParams.get('status');
    const priority = url.searchParams.get('priority');

    const page = Number(url.searchParams.get('page') || 1);
    const pageSize = Number(url.searchParams.get('pageSize') || 10);

    let filteredRequests = [...serviceRequests];

    if (search) {
      filteredRequests = filteredRequests.filter(
        (item) =>
          item.title.toLowerCase().includes(search) ||
          item.requesterName.toLowerCase().includes(search),
      );
    }

    if (status) {
      filteredRequests = filteredRequests.filter(
        (item) => item.status === status,
      );
    }

    if (priority) {
      filteredRequests = filteredRequests.filter(
        (item) => item.priority === priority,
      );
    }

    const sort = url.searchParams.get('sort');

if (sort) {
  const descending = sort.startsWith('-');
  const field = descending ? sort.slice(1) : sort;

  filteredRequests.sort((a, b) => {
    if (field === 'createdAt') {
      const first = new Date(a.createdAt).getTime();
      const second = new Date(b.createdAt).getTime();

      return descending
        ? second - first
        : first - second;
    }

    if (field === 'updatedAt') {
      const first = new Date(a.updatedAt).getTime();
      const second = new Date(b.updatedAt).getTime();

      return descending
        ? second - first
        : first - second;
    }

    return 0;
  });
}

    const total = filteredRequests.length;

    const totalPages =
      total === 0 ? 0 : Math.ceil(total / pageSize);

    const start = (page - 1) * pageSize;

    const items = filteredRequests.slice(
      start,
      start + pageSize,
    );

    return HttpResponse.json({
      items,
      page,
      pageSize,
      total,
      totalPages,
    });
  }),

  http.get(`*/requests/:requestId`, ({ params }) => {
    const requestItem = serviceRequests.find(
      (item) => item.id === params.requestId,
    );

    if (!requestItem) {
      return HttpResponse.json(
        {
          title: 'Request not found',
          status: 404,
          detail: `Service request ${params.requestId} was not found.`,
        },
        {
          status: 404,
        },
      );
    }

    return HttpResponse.json(requestItem);
  }),

    http.post('*/requests', async ({ request }) => {
    const body =
        (await request.json()) as CreateServiceRequest;

    const now = new Date().toISOString();

    const newRequest = {
        id: `req-${Date.now()}`,
        ...body,
        status: 'OPEN' as const,
        createdAt: now,
        updatedAt: now,
        version: 1,
    };

    serviceRequests.unshift(newRequest);

    return HttpResponse.json(newRequest, {
        status: 201,
    });
    }),
];