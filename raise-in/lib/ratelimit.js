//applying ratelimit using redis
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis= Redis.fromEnv()

export const donationRateLimit= new Ratelimit({
    redis, 
    limiter: Ratelimit.slidingWindow(10, "1 m") // 10 requests per minute (previously 5)
})
export const fundingRateLimit= new Ratelimit({
    redis, 
    limiter: Ratelimit.slidingWindow(40, "1 m") // 40 requests per minute (previously 20)
})
export const authRateLimit= new Ratelimit({
    redis, 
    limiter: Ratelimit.slidingWindow(20, "1 m") // 20 requests per minute (previously 10)
})