import { type Request, type Response } from 'express';
import * as linkService from '../services/link.service';

export const createLink = async (req: Request, res: Response) => {
  try {
    const { targetUrl, code } = req.body;
    if (!targetUrl) {
      return res
        .status(400)
        .json({ success: false, error: 'targetUrl is required' });
    }

    await linkService.createLink(targetUrl, code);
    res
      .status(201)
      .json({ success: true, message: 'Link created successfully' });
  } catch (error: any) {
    if (error.status === 400) {
      return res.status(400).json({ success: false, error: error.message });
    }
    if (error.status === 409) {
      return res.status(409).json({ success: false, error: error.message });
    }
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

export const getLinks = async (req: Request, res: Response) => {
  try {
    const links = await linkService.getLinks();
    res.json({ success: true, data: links });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

export const getLinkStats = async (req: Request, res: Response) => {
  try {
    const { code } = req.params;
    const stats = await linkService.getLinkStats(code);
    res.json({ success: true, data: stats });
  } catch (error: any) {
    if (error.status === 404) {
      return res.status(404).json({ success: false, error: error.message });
    }
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

export const deleteLink = async (req: Request, res: Response) => {
  try {
    const { code } = req.params;
    await linkService.deleteLink(code);
    res.json({ success: true });
  } catch (error: any) {
    if (error.status === 404) {
      return res.status(404).json({ success: false, error: error.message });
    }
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

export const redirectLink = async (req: Request, res: Response) => {
  try {
    const { code } = req.params;
    const targetUrl = await linkService.redirectLink(code);
    res.redirect(302, targetUrl);
  } catch (error: any) {
    if (error.status === 404) {
      return res.status(404).json({ success: false, error: 'Link not found' });
    }
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

export const healthCheck = (req: Request, res: Response) => {
  const uptime = Math.floor(process.uptime());
  res.json({
    success: true,
    data: {
      ok: true,
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      uptime,
      environment: process.env.NODE_ENV || 'development',
    },
  });
};
