import prisma from '../utils/db';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

const generateCode = (): string => {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
};

const isValidCode = (code: string): boolean => {
  return /^[A-Za-z0-9]{6,8}$/.test(code);
};

const normalizeUrl = (url: string): string => {
  if (!/^https?:\/\//i.test(url)) {
    return `https://${url}`;
  }
  return url;
};

export const createLink = async (targetUrl: string, customCode?: string) => {
  const code = customCode || generateCode();
  const normalizedUrl = normalizeUrl(targetUrl);

  if (!isValidCode(code)) {
    throw { status: 400, message: 'Code must be 6-8 alphanumeric characters' };
  }

  const existing = await prisma.urlMap.findUnique({ where: { code } });
  if (existing) {
    throw { status: 409, message: 'Code already exists' };
  }

  const shortenUrl = `${BASE_URL}/${code}`;

  await prisma.urlMap.create({
    data: { code, shortenUrl, targetUrl },
  });
};

export const getLinks = async () => {
  const links = await prisma.urlMap.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return links.map(link => ({
    code: link.code,
    targetUrl: link.targetUrl,
    clicks: link.clicks,
    lastClicked: link.lastClicked?.toISOString() || null,
    createdAt: link.createdAt.toISOString(),
  }));
};

export const getLinkStats = async (code: string) => {
  const link = await prisma.urlMap.findUnique({ where: { code } });
  if (!link) {
    throw { status: 404, message: 'Link not found' };
  }

  return {
    code: link.code,
    shortenUrl: link.shortenUrl,
    targetUrl: link.targetUrl,
    clicks: link.clicks,
    lastClicked: link.lastClicked?.toISOString() || null,
    createdAt: link.createdAt.toISOString(),
  };
};

export const deleteLink = async (code: string) => {
  const link = await prisma.urlMap.findUnique({ where: { code } });
  if (!link) {
    throw { status: 404, message: 'Link not found' };
  }

  await prisma.urlMap.delete({ where: { code } });
};

export const redirectLink = async (code: string) => {
  const link = await prisma.urlMap.findUnique({ where: { code } });
  if (!link) {
    throw { status: 404, message: 'Link not found' };
  }

  await prisma.urlMap.update({
    where: { code },
    data: { clicks: { increment: 1 }, lastClicked: new Date() },
  });

  return link.targetUrl;
};
