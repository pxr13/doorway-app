import { GET_LEADERBOARD, GET_TOP_LEADERBOARD } from "../utils/endpoints";
import { getErrorMessageFromResponse } from "../utils/helpers";
import * as Sentry from "@sentry/react";
import api from "../services/api";

export const getLeaderboard = async () => {
    try {
        const leaderboardResponse = await api.get(GET_LEADERBOARD);
        return leaderboardResponse.data.leaderboard;
    } catch (e) {
        Sentry.captureMessage(getErrorMessageFromResponse(e));
        return null;
    }
}

export const getTopLeaderboard = async () => {
    try {
        const leaderboardResponse = await api.get(GET_TOP_LEADERBOARD);
        return leaderboardResponse.data.leaderboard;
    } catch (e) {
        Sentry.captureMessage(getErrorMessageFromResponse(e));
        return null;
    }
}