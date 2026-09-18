import { http, HttpResponse } from 'msw';

import { serviceRequests } from './data';

const API_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

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
];