//applying ratelimit using redis
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis= Redis.fromEnv()

export const donationRateLimit= new Ratelimit({
    redis, 
    limiter: Ratelimit.slidingWindow(5, "1 m") // 5 requests per minute
})
export const fundingRateLimit= new Ratelimit({
    redis, 
    limiter: Ratelimit.slidingWindow(3, "1 m") // 3 requests per minute
})
export const authRateLimit= new Ratelimit({
    redis, 
    limiter: Ratelimit.slidingWindow(10, "1 m") // 10 requests per minute
})