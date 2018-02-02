package com.dinogroup.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.dinogroup.domain.HoaDonBanHang;

import com.dinogroup.repository.HoaDonBanHangRepository;
import com.dinogroup.web.rest.errors.BadRequestAlertException;
import com.dinogroup.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing HoaDonBanHang.
 */
@RestController
@RequestMapping("/api")
public class HoaDonBanHangResource {

    private final Logger log = LoggerFactory.getLogger(HoaDonBanHangResource.class);

    private static final String ENTITY_NAME = "hoaDonBanHang";

    private final HoaDonBanHangRepository hoaDonBanHangRepository;

    public HoaDonBanHangResource(HoaDonBanHangRepository hoaDonBanHangRepository) {
        this.hoaDonBanHangRepository = hoaDonBanHangRepository;
    }

    /**
     * POST  /hoa-don-ban-hangs : Create a new hoaDonBanHang.
     *
     * @param hoaDonBanHang the hoaDonBanHang to create
     * @return the ResponseEntity with status 201 (Created) and with body the new hoaDonBanHang, or with status 400 (Bad Request) if the hoaDonBanHang has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/hoa-don-ban-hangs")
    @Timed
    public ResponseEntity<HoaDonBanHang> createHoaDonBanHang(@RequestBody HoaDonBanHang hoaDonBanHang) throws URISyntaxException {
        log.debug("REST request to save HoaDonBanHang : {}", hoaDonBanHang);
        if (hoaDonBanHang.getId() != null) {
            throw new BadRequestAlertException("A new hoaDonBanHang cannot already have an ID", ENTITY_NAME, "idexists");
        }
        HoaDonBanHang result = hoaDonBanHangRepository.save(hoaDonBanHang);
        return ResponseEntity.created(new URI("/api/hoa-don-ban-hangs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /hoa-don-ban-hangs : Updates an existing hoaDonBanHang.
     *
     * @param hoaDonBanHang the hoaDonBanHang to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated hoaDonBanHang,
     * or with status 400 (Bad Request) if the hoaDonBanHang is not valid,
     * or with status 500 (Internal Server Error) if the hoaDonBanHang couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/hoa-don-ban-hangs")
    @Timed
    public ResponseEntity<HoaDonBanHang> updateHoaDonBanHang(@RequestBody HoaDonBanHang hoaDonBanHang) throws URISyntaxException {
        log.debug("REST request to update HoaDonBanHang : {}", hoaDonBanHang);
        if (hoaDonBanHang.getId() == null) {
            return createHoaDonBanHang(hoaDonBanHang);
        }
        HoaDonBanHang result = hoaDonBanHangRepository.save(hoaDonBanHang);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, hoaDonBanHang.getId().toString()))
            .body(result);
    }

    /**
     * GET  /hoa-don-ban-hangs : get all the hoaDonBanHangs.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of hoaDonBanHangs in body
     */
    @GetMapping("/hoa-don-ban-hangs")
    @Timed
    public List<HoaDonBanHang> getAllHoaDonBanHangs() {
        log.debug("REST request to get all HoaDonBanHangs");
        return hoaDonBanHangRepository.findAll();
        }

    /**
     * GET  /hoa-don-ban-hangs/:id : get the "id" hoaDonBanHang.
     *
     * @param id the id of the hoaDonBanHang to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the hoaDonBanHang, or with status 404 (Not Found)
     */
    @GetMapping("/hoa-don-ban-hangs/{id}")
    @Timed
    public ResponseEntity<HoaDonBanHang> getHoaDonBanHang(@PathVariable Long id) {
        log.debug("REST request to get HoaDonBanHang : {}", id);
        HoaDonBanHang hoaDonBanHang = hoaDonBanHangRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(hoaDonBanHang));
    }

    /**
     * DELETE  /hoa-don-ban-hangs/:id : delete the "id" hoaDonBanHang.
     *
     * @param id the id of the hoaDonBanHang to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/hoa-don-ban-hangs/{id}")
    @Timed
    public ResponseEntity<Void> deleteHoaDonBanHang(@PathVariable Long id) {
        log.debug("REST request to delete HoaDonBanHang : {}", id);
        hoaDonBanHangRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
